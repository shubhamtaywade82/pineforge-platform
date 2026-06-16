import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PineEditor } from "./components/editor/PineEditor";

vi.mock("@monaco-editor/react", () => ({
  default: ({
    beforeMount,
    onMount,
  }: {
    beforeMount?: (monaco: typeof import("monaco-editor")) => void;
    onMount?: (
      editor: { updateOptions: (options: { readOnly: boolean }) => void },
      monaco: typeof import("monaco-editor")
    ) => void;
  }) => {
    const monaco = {
      languages: {
        getLanguages: () => [],
        register: vi.fn(),
        setMonarchTokensProvider: vi.fn(),
        setLanguageConfiguration: vi.fn(),
        registerCompletionItemProvider: vi.fn(),
        CompletionItemKind: { Function: 1 },
      },
    } as unknown as typeof import("monaco-editor");

    beforeMount?.(monaco);
    onMount?.({ updateOptions: vi.fn() }, monaco);

    return <div data-testid="pine-editor" />;
  },
}));

describe("PineEditor", () => {
  it("registers the pine language on mount", () => {
    const { getByTestId } = render(<PineEditor code={"//@version=6"} />);
    expect(getByTestId("pine-editor")).toBeInTheDocument();
  });
});
