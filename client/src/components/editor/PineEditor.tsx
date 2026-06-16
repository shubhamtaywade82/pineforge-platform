import type { editor } from "monaco-editor";
import Editor from "@monaco-editor/react";

const PINE_KEYWORDS = [
  "indicator",
  "strategy",
  "library",
  "var",
  "varip",
  "export",
  "import",
  "method",
  "type",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "true",
  "false",
  "na",
  "nz",
  "int",
  "float",
  "bool",
  "color",
  "string",
  "series",
  "simple",
  "const",
];

const PINE_BUILTINS = [
  "ta.sma",
  "ta.ema",
  "ta.rsi",
  "ta.macd",
  "ta.bbands",
  "ta.atr",
  "ta.stoch",
  "ta.crossover",
  "ta.crossunder",
  "ta.highest",
  "ta.lowest",
  "math.max",
  "math.min",
  "math.abs",
  "math.round",
  "request.security",
  "strategy.entry",
  "strategy.close",
  "strategy.exit",
  "plot",
  "plotshape",
  "plotchar",
  "hline",
  "bgcolor",
  "barcolor",
];

function registerPineLanguage(monaco: typeof import("monaco-editor")) {
  if (monaco.languages.getLanguages().some((language) => language.id === "pine")) {
    return;
  }

  monaco.languages.register({ id: "pine" });
  monaco.languages.setMonarchTokensProvider("pine", {
    keywords: PINE_KEYWORDS,
    builtins: PINE_BUILTINS,
    tokenizer: {
      root: [
        [/\/\/.*$/, "comment"],
        [/"[^"]*"/, "string"],
        [/\d+(\.\d+)?/, "number"],
        [
          /[a-zA-Z_]\w*(?=\()/,
          { cases: { "@builtins": "type", "@default": "function" } },
        ],
        [
          /[a-zA-Z_]\w*/,
          { cases: { "@keywords": "keyword", "@default": "identifier" } },
        ],
        [/[=><!+\-*/]+/, "operator"],
      ],
    },
  });

  monaco.languages.setLanguageConfiguration("pine", {
    comments: { lineComment: "//" },
    brackets: [["(", ")"], ["[", "]"]],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: '"', close: '"' },
    ],
  });

  monaco.languages.registerCompletionItemProvider("pine", {
    provideCompletionItems: () => ({
      suggestions: [...PINE_BUILTINS, ...PINE_KEYWORDS].map((label) => ({
        label,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: label,
      })),
    }),
  });
}

type PineEditorProps = {
  code: string;
  readOnly?: boolean;
  onChange?: (value: string | undefined) => void;
};

export function PineEditor({ code, readOnly = false, onChange }: PineEditorProps) {
  return (
    <Editor
      height="100%"
      language="pine"
      value={code}
      theme="vs-dark"
      onChange={onChange}
      options={{
        readOnly,
        fontSize: 13,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
      }}
      beforeMount={(monaco) => registerPineLanguage(monaco)}
      onMount={(editorInstance: editor.IStandaloneCodeEditor, monaco) => {
        registerPineLanguage(monaco);
        editorInstance.updateOptions({ readOnly });
      }}
    />
  );
}
