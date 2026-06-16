import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PineEditor } from "./components/editor/PineEditor";

const setModelMarkers = vi.fn();
const registerInlineCompletionsProvider = vi.fn();

vi.mock("./editor/pine-language", () => ({
  registerPineLanguage: vi.fn(),
}));

vi.mock("./editor/pine-inline-completions", () => ({
  registerPineInlineCompletions: vi.fn(),
}));

vi.mock("./editor/pine-diagnostics", () => ({
  applyValidationDecorations: vi.fn(),
}));

vi.mock("@monaco-editor/react", () => ({
  default: ({
    beforeMount,
    onMount,
  }: {
    beforeMount?: (monaco: typeof import("monaco-editor")) => void;
    onMount?: (
      editor: {
        updateOptions: (options: { readOnly: boolean }) => void;
        addCommand: ReturnType<typeof vi.fn>;
        getModel: () => null;
        getValue: () => string;
      },
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
        registerInlineCompletionsProvider,
        CompletionItemKind: { Function: 1 },
        CompletionItemInsertTextRule: { InsertAsSnippet: 4 },
      },
      editor: {
        defineTheme: vi.fn(),
        setModelMarkers,
      },
      KeyMod: { CtrlCmd: 1, Shift: 2 },
      KeyCode: { KeyS: 3, KeyD: 4 },
      MarkerSeverity: { Error: 8, Warning: 4 },
    } as unknown as typeof import("monaco-editor");

    beforeMount?.(monaco);
    onMount?.(
      {
        updateOptions: vi.fn(),
        addCommand: vi.fn(),
        getModel: () => null,
        getValue: () => "//@version=6",
      },
      monaco
    );

    return <div data-testid="pine-editor" />;
  },
  DiffEditor: () => <div data-testid="pine-diff-editor" />,
}));

describe("PineEditor", () => {
  it("registers pine language and inline completions on mount", async () => {
    const { registerPineLanguage } = await import("./editor/pine-language");
    const { registerPineInlineCompletions } = await import("./editor/pine-inline-completions");

    const { getByTestId } = render(<PineEditor code={"//@version=6"} />);
    expect(getByTestId("pine-editor")).toBeInTheDocument();
    expect(registerPineLanguage).toHaveBeenCalled();
    expect(registerPineInlineCompletions).toHaveBeenCalled();
  });

  it("applies validation decorations when validation changes", async () => {
    const { applyValidationDecorations } = await import("./editor/pine-diagnostics");

    const validation = {
      passed: false,
      errors: ["Line 2: Use request.security() not bare security()"],
      warnings: [],
    };

    const { rerender } = render(<PineEditor code={"//@version=6\nsecurity(close)"} />);

    rerender(
      <PineEditor code={"//@version=6\nsecurity(close)"} validation={validation} />
    );

    await waitFor(() => {
      expect(applyValidationDecorations).toHaveBeenCalled();
    });
  });

  it("renders DiffEditor when showDiff is enabled", () => {
    const versions = [
      {
        id: "v1",
        version_number: 1,
        code: "left",
        prompt_delta: null,
        created_at: "2025-06-16T00:00:00Z",
      },
      {
        id: "v2",
        version_number: 2,
        code: "right",
        prompt_delta: "Add RSI",
        created_at: "2025-06-16T01:00:00Z",
      },
    ];

    const { getByTestId } = render(
      <PineEditor
        code="right"
        leftCode="left"
        rightCode="right"
        showDiff
        versions={versions}
        leftVersion={versions[0]}
        rightVersion={versions[1]}
        onToggleDiff={vi.fn()}
      />
    );

    expect(getByTestId("pine-diff-editor")).toBeInTheDocument();
  });

  it("toggles diff mode from the toolbar button", () => {
    const onToggleDiff = vi.fn();
    const versions = [
      {
        id: "v1",
        version_number: 1,
        code: "left",
        prompt_delta: null,
        created_at: "2025-06-16T00:00:00Z",
      },
      {
        id: "v2",
        version_number: 2,
        code: "right",
        prompt_delta: null,
        created_at: "2025-06-16T01:00:00Z",
      },
    ];

    render(
      <PineEditor
        code="right"
        leftCode="left"
        rightCode="right"
        versions={versions}
        leftVersion={versions[0]}
        rightVersion={versions[1]}
        onToggleDiff={onToggleDiff}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Diff" }));

    expect(onToggleDiff).toHaveBeenCalled();
  });
});
