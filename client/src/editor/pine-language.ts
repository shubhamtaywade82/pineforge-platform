import type { languages } from "monaco-editor";

const PINE_KEYWORDS = [
  "var",
  "varip",
  "export",
  "import",
  "method",
  "type",
  "if",
  "else",
  "for",
  "to",
  "by",
  "while",
  "switch",
  "case",
  "default",
  "break",
  "continue",
  "return",
  "true",
  "false",
  "na",
  "int",
  "float",
  "bool",
  "color",
  "string",
  "label",
  "line",
  "box",
  "table",
  "linefill",
  "polyline",
  "series",
  "simple",
  "const",
];

const PINE_DECLARATIONS = ["indicator", "strategy", "library"];

const PINE_NAMESPACES = [
  "ta",
  "math",
  "array",
  "matrix",
  "map",
  "str",
  "request",
  "strategy",
  "color",
  "chart",
  "timeframe",
  "ticker",
  "syminfo",
  "session",
  "line",
  "label",
  "box",
  "table",
  "runtime",
  "log",
  "input",
];

const PINE_OPERATORS = [
  "=>",
  ":=",
  "==",
  "!=",
  "<=",
  ">=",
  "<",
  ">",
  "+",
  "-",
  "*",
  "/",
  "%",
  "?",
  ":",
  "and",
  "or",
  "not",
];

type CompletionSpec = {
  label: string;
  kind: languages.CompletionItemKind;
  insertText: string;
  detail?: string;
  documentation?: string;
};

function pineCompletions(K: typeof languages.CompletionItemKind): CompletionSpec[] {
  return [
    { label: "ta.sma", kind: K.Function, insertText: "ta.sma(${1:source}, ${2:length})", detail: "Simple Moving Average" },
    { label: "ta.ema", kind: K.Function, insertText: "ta.ema(${1:source}, ${2:length})", detail: "Exponential Moving Average" },
    { label: "ta.rsi", kind: K.Function, insertText: "ta.rsi(${1:source}, ${2:length})", detail: "Relative Strength Index" },
    {
      label: "ta.macd",
      kind: K.Function,
      insertText: "ta.macd(${1:source}, ${2:fast}, ${3:slow}, ${4:signal})",
      detail: "MACD",
    },
    { label: "ta.atr", kind: K.Function, insertText: "ta.atr(${1:length})", detail: "Average True Range" },
    { label: "ta.bb", kind: K.Function, insertText: "ta.bb(${1:source}, ${2:length}, ${3:mult})", detail: "Bollinger Bands" },
    {
      label: "ta.crossover",
      kind: K.Function,
      insertText: "ta.crossover(${1:source1}, ${2:source2})",
      detail: "Cross above",
    },
    {
      label: "ta.crossunder",
      kind: K.Function,
      insertText: "ta.crossunder(${1:source1}, ${2:source2})",
      detail: "Cross below",
    },
    { label: "ta.highest", kind: K.Function, insertText: "ta.highest(${1:source}, ${2:length})", detail: "Highest value" },
    { label: "ta.lowest", kind: K.Function, insertText: "ta.lowest(${1:source}, ${2:length})", detail: "Lowest value" },
    {
      label: "request.security",
      kind: K.Function,
      insertText: 'request.security(${1:symbol}, ${2:"D"}, ${3:expression})',
      detail: "Multi-timeframe expression",
    },
    {
      label: "strategy.entry",
      kind: K.Function,
      insertText: 'strategy.entry("${1:id}", ${2:strategy.long})',
      detail: "Open a market position",
    },
    { label: "strategy.close", kind: K.Function, insertText: 'strategy.close("${1:id}")', detail: "Close a market position" },
    {
      label: "strategy.exit",
      kind: K.Function,
      insertText: 'strategy.exit("${1:id}", from_entry="${2:id}", profit=${3:0}, loss=${4:0})',
      detail: "Exit with TP/SL",
    },
    {
      label: "color.new",
      kind: K.Function,
      insertText: "color.new(${1:color.red}, ${2:80})",
      detail: "Color with transparency",
    },
    {
      label: "plot",
      kind: K.Function,
      insertText: 'plot(${1:series}, title="${2:}", color=${3:color.blue})',
      detail: "Plot a series",
    },
    {
      label: "plotshape",
      kind: K.Function,
      insertText:
        'plotshape(${1:condition}, title="${2:}", style=shape.circle, location=location.belowbar, color=color.green)',
      detail: "Plot a shape",
    },
    { label: "bgcolor", kind: K.Function, insertText: "bgcolor(${1:color})", detail: "Background color" },
    {
      label: "hline",
      kind: K.Function,
      insertText: "hline(${1:price}, color=${2:color.gray}, linestyle=hline.style_dashed)",
      detail: "Horizontal line",
    },
    {
      label: "input.int",
      kind: K.Function,
      insertText: 'input.int(${1:14}, title="${2:Length}", minval=1)',
      detail: "Integer input",
    },
    { label: "input.float", kind: K.Function, insertText: 'input.float(${1:1.0}, title="${2:Value}")', detail: "Float input" },
    { label: "input.bool", kind: K.Function, insertText: 'input.bool(${1:true}, title="${2:Enable}")', detail: "Boolean input" },
    {
      label: "input.source",
      kind: K.Function,
      insertText: 'input.source(${1:close}, title="${2:Source}")',
      detail: "Source input",
    },
    { label: "math.max", kind: K.Function, insertText: "math.max(${1:a}, ${2:b})", detail: "Maximum" },
    { label: "math.min", kind: K.Function, insertText: "math.min(${1:a}, ${2:b})", detail: "Minimum" },
    { label: "math.abs", kind: K.Function, insertText: "math.abs(${1:x})", detail: "Absolute value" },
    { label: "math.round", kind: K.Function, insertText: "math.round(${1:x})", detail: "Round" },
    {
      label: "array.new<float>",
      kind: K.Function,
      insertText: "array.new<float>(${1:size}, ${2:0.0})",
      detail: "Float array",
    },
    { label: "array.push", kind: K.Function, insertText: "array.push(${1:id}, ${2:value})", detail: "Append to array" },
    { label: "array.get", kind: K.Function, insertText: "array.get(${1:id}, ${2:index})", detail: "Get element" },
    {
      label: "indicator",
      kind: K.Function,
      insertText:
        'indicator(title="${1:My Indicator}", shorttitle="${2:MI}", overlay=${3:false}, max_bars_back=500)',
      detail: "Declare an indicator",
    },
    {
      label: "strategy",
      kind: K.Function,
      insertText:
        'strategy(title="${1:My Strategy}", overlay=${2:false}, initial_capital=10000,\n         default_qty_type=strategy.percent_of_equity, default_qty_value=100)',
      detail: "Declare a strategy",
    },
    {
      label: "library",
      kind: K.Function,
      insertText: 'library("${1:LibraryName}", overlay=${2:false})',
      detail: "Declare a library",
    },
    { label: "close", kind: K.Variable, insertText: "close", detail: "Closing price" },
    { label: "open", kind: K.Variable, insertText: "open", detail: "Opening price" },
    { label: "high", kind: K.Variable, insertText: "high", detail: "High price" },
    { label: "low", kind: K.Variable, insertText: "low", detail: "Low price" },
    { label: "volume", kind: K.Variable, insertText: "volume", detail: "Volume" },
    { label: "bar_index", kind: K.Variable, insertText: "bar_index", detail: "Current bar index" },
    { label: "syminfo.ticker", kind: K.Variable, insertText: "syminfo.ticker", detail: "Ticker symbol" },
  ];
}

let pineLanguageRegistered = false;

export function registerPineLanguage(monaco: typeof import("monaco-editor")) {
  if (pineLanguageRegistered || monaco.languages.getLanguages().some((language) => language.id === "pine")) {
    pineLanguageRegistered = true;
    return;
  }

  pineLanguageRegistered = true;

  monaco.languages.register({ id: "pine", extensions: [".pine"], aliases: ["Pine Script"] });

  monaco.languages.setMonarchTokensProvider("pine", {
    defaultToken: "invalid",
    ignoreCase: false,
    keywords: PINE_KEYWORDS,
    declarations: PINE_DECLARATIONS,
    namespaces: PINE_NAMESPACES,
    operators: PINE_OPERATORS,
    symbols: /[=><!~?:&|+\-*/^%]+/,
    escapes: /\\(?:[nrt\\"])/,
    tokenizer: {
      root: [
        [/^\/\/[\x40]version=\d/, "annotation.version"],
        [/\/\/.*$/, "comment"],
        [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
        [
          /([a-zA-Z_]\w*)(\.)([a-zA-Z_]\w*)(?=\s*\()/,
          [
            { cases: { "@namespaces": "builtin.namespace", "@default": "identifier" } },
            "operator.dot",
            "builtin.function",
          ],
        ],
        [
          /([a-zA-Z_]\w*)(\.)([a-zA-Z_]\w*)/,
          [
            { cases: { "@namespaces": "builtin.namespace", "@default": "identifier" } },
            "operator.dot",
            "builtin.property",
          ],
        ],
        [/\b(indicator|strategy|library)\b(?=\s*\()/, "declaration"],
        [
          /\b[a-zA-Z_]\w*\b/,
          {
            cases: {
              "@keywords": "keyword",
              "@declarations": "declaration",
              "@operators": "keyword.operator",
              "@default": "identifier",
            },
          },
        ],
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+/, "number"],
        [/@symbols/, { cases: { "@operators": "operator", "@default": "delimiter" } }],
        [/[{}[\]()]/, "@brackets"],
        [/\s+/, "white"],
      ],
      string: [
        [/[^\\"\n]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
    },
  });

  monaco.editor.defineTheme("pine-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "annotation.version", foreground: "569CD6", fontStyle: "bold" },
      { token: "declaration", foreground: "DCDCAA", fontStyle: "bold" },
      { token: "builtin.namespace", foreground: "4EC9B0" },
      { token: "builtin.function", foreground: "DCDCAA" },
      { token: "builtin.property", foreground: "9CDCFE" },
      { token: "keyword", foreground: "C586C0" },
      { token: "keyword.operator", foreground: "569CD6" },
      { token: "number", foreground: "B5CEA8" },
      { token: "number.float", foreground: "B5CEA8" },
      { token: "string", foreground: "CE9178" },
      { token: "comment", foreground: "6A9955", fontStyle: "italic" },
      { token: "operator", foreground: "D4D4D4" },
    ],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#D4D4D4",
      "editorLineNumber.foreground": "#495162",
      "editorCursor.foreground": "#AEAFAD",
      "editor.lineHighlightBackground": "#161B22",
      "editorGutter.background": "#0d1117",
    },
  });

  monaco.languages.registerCompletionItemProvider("pine", {
    triggerCharacters: [".", "(", " "],
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const K = monaco.languages.CompletionItemKind;

      return {
        suggestions: pineCompletions(K).map((completion) => ({
          ...completion,
          range,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        })),
      };
    },
  });

  monaco.languages.setLanguageConfiguration("pine", {
    comments: { lineComment: "//" },
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"', notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: '"', close: '"' },
    ],
    indentationRules: {
      increaseIndentPattern: /^\s*(if|else|for|while|switch|=>).*/,
      decreaseIndentPattern: /^\s*$/,
    },
  });
}
