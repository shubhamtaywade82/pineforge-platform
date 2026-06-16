import type { ScriptType } from "../types";

const MIN_PREFIX_LENGTH = 10;
const DEBOUNCE_MS = 400;

let inlineCompletionsRegistered = false;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function registerPineInlineCompletions(
  monaco: typeof import("monaco-editor"),
  completeUrl: string,
  scriptType: ScriptType = "indicator"
) {
  if (inlineCompletionsRegistered) {
    return;
  }

  inlineCompletionsRegistered = true;

  monaco.languages.registerInlineCompletionsProvider("pine", {
    provideInlineCompletions: (model, position, _context, token) =>
      new Promise((resolve) => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(async () => {
          if (token.isCancellationRequested) {
            resolve({ items: [] });
            return;
          }

          const prefix = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          if (prefix.trim().length < MIN_PREFIX_LENGTH) {
            resolve({ items: [] });
            return;
          }

          const controller = new AbortController();
          token.onCancellationRequested(() => controller.abort());

          try {
            const response = await fetch(completeUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prefix, script_type: scriptType }),
              signal: controller.signal,
            });

            if (!response.ok || token.isCancellationRequested) {
              resolve({ items: [] });
              return;
            }

            const payload = (await response.json()) as { completion?: string };
            const suggestion = payload.completion?.trim() ?? "";

            if (!suggestion) {
              resolve({ items: [] });
              return;
            }

            resolve({
              items: [
                {
                  insertText: suggestion,
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                  },
                },
              ],
              enableForwardStability: true,
            });
          } catch {
            resolve({ items: [] });
          }
        }, DEBOUNCE_MS);
      }),
  });
}

export function resetInlineCompletionsRegistration() {
  inlineCompletionsRegistered = false;
}
