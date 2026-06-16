import { useCallback, useRef, useState } from "react";
import type { StreamEvent, StreamStatus, ValidationResult } from "../types";

type StreamMetadata = {
  indicatorId?: string;
  validation?: ValidationResult;
  version?: number;
};

export function useSSEStream() {
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<StreamMetadata>({});
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);

  const stream = useCallback(async (url: string, body: Record<string, unknown>) => {
    setStatus("streaming");
    setCode("");
    setError(null);
    setMetadata({});

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Streaming is not supported in this browser");
      }

      readerRef.current = reader;
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          if (!part.startsWith("data: ")) {
            continue;
          }

          const event = JSON.parse(part.slice(6)) as StreamEvent;
          if (event.type === "token" && event.token) {
            setCode((previous) => previous + event.token);
          }
          if (event.type === "init" && event.indicator_id) {
            setMetadata((previous) => ({ ...previous, indicatorId: event.indicator_id }));
          }
          if (event.type === "done") {
            setStatus("done");
            setMetadata((previous) => ({
              ...previous,
              validation: event.validation,
              indicatorId: event.indicator_id ?? previous.indicatorId,
              version: event.version,
            }));
          }
          if (event.type === "error") {
            setStatus("error");
            setError(event.message ?? "Generation failed");
          }
        }
      }

      setStatus((current) => (current === "streaming" ? "done" : current));
    } catch (streamError) {
      setStatus("error");
      setError(streamError instanceof Error ? streamError.message : "Generation failed");
    }
  }, []);

  const cancel = useCallback(() => {
    readerRef.current?.cancel();
    setStatus("idle");
  }, []);

  return { stream, cancel, status, code, error, metadata };
}
