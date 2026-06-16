import { useCallback, useEffect, useState } from "react";
import { useSSEStream } from "./useSSEStream";
import type { ChatMessage, ScriptType } from "../types";

export function useGenerator() {
  const [scriptType, setScriptType] = useState<ScriptType>("indicator");
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [previousCode, setPreviousCode] = useState<string | undefined>();
  const { stream, cancel, status, code, error, metadata } = useSSEStream();

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

  return {
    scriptType,
    setScriptType,
    prompt,
    setPrompt,
    generate,
    refine,
    cancel,
    status,
    code,
    error,
    metadata,
    chatHistory,
    indicatorId: metadata.indicatorId,
    previousCode,
  };
}
