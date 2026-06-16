import { useCallback, useEffect, useState } from "react";
import { useSSEStream } from "./useSSEStream";
import type { ChatMessage, ScriptType } from "../types";

export function useGenerator() {
  const [scriptType, setScriptType] = useState<ScriptType>("indicator");
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [previousCode, setPreviousCode] = useState<string | undefined>();
  const {
    stream,
    cancel,
    reset: resetStream,
    status,
    code,
    error,
    metadata,
  } = useSSEStream();

  const [rephrasing, setRephrasing] = useState(false);
  const [rephraseError, setRephraseError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    setPreviousCode(undefined);
    setChatHistory((previous) => [...previous, { role: "user", content: prompt }]);
    await stream("/api/v1/generators", { prompt, script_type: scriptType });
  }, [prompt, scriptType, stream]);

  const refine = useCallback(
    async (refinementPrompt: string) => {
      if (!metadata.indicatorId) {
        return;
      }

      setPreviousCode(code);
      setChatHistory((previous) => [...previous, { role: "user", content: refinementPrompt }]);
      await stream(`/api/v1/generators/${metadata.indicatorId}/refine`, {
        prompt: refinementPrompt,
      });
    },
    [code, metadata.indicatorId, stream]
  );

  useEffect(() => {
    if (status === "done" && code) {
      setChatHistory((previous) => [...previous, { role: "assistant", content: code }]);
    }
  }, [status, code]);

  const rephrasePrompt = useCallback(async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      return;
    }

    setRephrasing(true);
    setRephraseError(null);

    try {
      const response = await fetch("/api/v1/generators/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedPrompt, script_type: scriptType }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? `HTTP ${response.status}`);
      }

      const payload = (await response.json()) as { rephrased_prompt?: string };
      if (payload.rephrased_prompt) {
        setPrompt(payload.rephrased_prompt);
      }
    } catch (rephraseFailure) {
      setRephraseError(
        rephraseFailure instanceof Error ? rephraseFailure.message : "Failed to rephrase prompt"
      );
    } finally {
      setRephrasing(false);
    }
  }, [prompt, scriptType]);

  const reset = useCallback(() => {
    setPrompt("");
    setChatHistory([]);
    setPreviousCode(undefined);
    resetStream();
  }, [resetStream]);

  return {
    scriptType,
    setScriptType,
    prompt,
    setPrompt,
    generate,
    refine,
    rephrasePrompt,
    rephrasing,
    rephraseError,
    cancel,
    reset,
    status,
    code,
    error,
    metadata,
    chatHistory,
    indicatorId: metadata.indicatorId,
    previousCode,
  };
}
