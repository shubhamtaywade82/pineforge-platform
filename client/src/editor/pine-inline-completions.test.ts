import { describe, expect, it, vi, beforeEach } from "vitest";
import { registerPineInlineCompletions, resetInlineCompletionsRegistration } from "./pine-inline-completions";

describe("registerPineInlineCompletions", () => {
  beforeEach(() => {
    resetInlineCompletionsRegistration();
  });

  it("registers an inline completions provider for pine", () => {
    const registerInlineCompletionsProvider = vi.fn();

    const monaco = {
      languages: {
        registerInlineCompletionsProvider,
      },
    } as unknown as typeof import("monaco-editor");

    registerPineInlineCompletions(monaco, "/api/v1/generators/complete", "indicator");

    expect(registerInlineCompletionsProvider).toHaveBeenCalledWith(
      "pine",
      expect.objectContaining({
        provideInlineCompletions: expect.any(Function),
      })
    );
  });

  it("registers only once", () => {
    const registerInlineCompletionsProvider = vi.fn();

    const monaco = {
      languages: {
        registerInlineCompletionsProvider,
      },
    } as unknown as typeof import("monaco-editor");

    registerPineInlineCompletions(monaco, "/api/v1/generators/complete");
    registerPineInlineCompletions(monaco, "/api/v1/generators/complete");

    expect(registerInlineCompletionsProvider).toHaveBeenCalledTimes(1);
  });
});
