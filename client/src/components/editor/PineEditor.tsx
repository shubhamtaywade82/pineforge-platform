import { useCallback, useEffect, useRef, useState } from "react";
import type { editor } from "monaco-editor";
import Editor, { DiffEditor } from "@monaco-editor/react";
import type { IndicatorVersion, ScriptType, ValidationResult } from "../../types";
import { registerPineLanguage } from "../../editor/pine-language";
import { applyValidationDecorations } from "../../editor/pine-diagnostics";
import { registerPineInlineCompletions } from "../../editor/pine-inline-completions";

export type PineEditorProps = {
  code: string;
  leftCode?: string;
  rightCode?: string;
  readOnly?: boolean;
  onChange?: (value: string | undefined) => void;
  validation?: ValidationResult;
  onSave?: (code: string) => void;
  completeUrl?: string;
  scriptType?: ScriptType;
  showDiff?: boolean;
  onToggleDiff?: () => void;
  versions?: IndicatorVersion[];
  leftVersion?: IndicatorVersion;
  rightVersion?: IndicatorVersion;
  onSelectLeftVersion?: (version: IndicatorVersion) => void;
  onSelectRightVersion?: (version: IndicatorVersion) => void;
};

const DEFAULT_COMPLETE_URL = "/api/v1/generators/complete";
const TRADINGVIEW_PINE_EDITOR_URL = "https://www.tradingview.com/pine-editor/";

export function PineEditor({
  code,
  leftCode,
  rightCode,
  readOnly = false,
  onChange,
  validation,
  onSave,
  completeUrl = DEFAULT_COMPLETE_URL,
  scriptType = "indicator",
  showDiff = false,
  onToggleDiff,
  versions = [],
  leftVersion,
  rightVersion,
  onSelectLeftVersion,
  onSelectRightVersion,
}: PineEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      applyValidationDecorations(editorRef.current, monacoRef.current, validation);
    }
  }, [validation]);

  const handleBeforeMount = useCallback((monaco: typeof import("monaco-editor")) => {
    registerPineLanguage(monaco);
  }, []);

  const handleEditorDidMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor, monaco: typeof import("monaco-editor")) => {
      editorRef.current = editorInstance;
      monacoRef.current = monaco;

      registerPineLanguage(monaco);
      registerPineInlineCompletions(monaco, completeUrl, scriptType);

      editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        onSave?.(editorInstance.getValue());
      });

      editorInstance.updateOptions({ readOnly });
      applyValidationDecorations(editorInstance, monaco, validation);
    },
    [completeUrl, onSave, readOnly, scriptType, validation]
  );

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInTradingView = async () => {
    await navigator.clipboard.writeText(code);
    window.open(TRADINGVIEW_PINE_EDITOR_URL, "_blank", "noopener,noreferrer");
  };

  const diffAvailable = Boolean(leftCode && rightCode);

  const handleLeftVersionChange = (versionId: string) => {
    const version = versions.find((entry) => entry.id === versionId);
    if (version) {
      onSelectLeftVersion?.(version);
    }
  };

  const handleRightVersionChange = (versionId: string) => {
    const version = versions.find((entry) => entry.id === versionId);
    if (version) {
      onSelectRightVersion?.(version);
    }
  };

  const leftVersionId = leftVersion?.id ?? "";
  const rightVersionId = rightVersion?.id ?? "";

  return (
    <div className="relative flex h-full flex-col bg-[#070A13]">
      {/* Editor Header / Toolbar */}
      <div className="flex h-12 flex-shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#0B0F19]/60 px-4 backdrop-blur-md">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-900/80 px-2.5 py-1 border border-slate-800">
            <span className="h-2 w-2 rounded-full bg-[#4EC9B0]" />
            <span className="font-mono text-[#4EC9B0] text-[10px] font-bold tracking-wider">
              PINE v6
            </span>
          </div>

          {validation && (
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold border transition-all ${
                validation.passed
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {validation.passed ? (
                <>
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Valid
                </>
              ) : (
                <>
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {validation.errors.length} error{validation.errors.length === 1 ? "" : "s"}
                </>
              )}
            </span>
          )}

          {showDiff && versions.length >= 2 ? (
            <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 p-1 border border-slate-800/80">
              <select
                aria-label="Left version"
                value={leftVersionId}
                onChange={(event) => handleLeftVersionChange(event.target.value)}
                className="rounded border border-slate-700/60 bg-[#0E1322] px-2 py-0.5 text-[10px] text-slate-200 outline-none hover:border-slate-600 transition-colors"
              >
                {versions.map((version) => (
                  <option key={`left-${version.id}`} value={version.id}>
                    V{version.version_number}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                vs
              </span>
              <select
                aria-label="Right version"
                value={rightVersionId}
                onChange={(event) => handleRightVersionChange(event.target.value)}
                className="rounded border border-slate-700/60 bg-[#0E1322] px-2 py-0.5 text-[10px] text-slate-200 outline-none hover:border-slate-600 transition-colors"
              >
                {versions.map((version) => (
                  <option key={`right-${version.id}`} value={version.id}>
                    V{version.version_number}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>

        {/* Action button Group */}
        <div className="flex items-center gap-2">
          {diffAvailable && onToggleDiff ? (
            <button
              type="button"
              onClick={onToggleDiff}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition-all ${
                showDiff
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                  : "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              {showDiff ? "Editor" : "Diff"}
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => void copyToClipboard()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:border-slate-700 hover:text-slate-200"
          >
            {copied ? (
              <>
                <svg
                  className="h-3.5 w-3.5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => void openInTradingView()}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20 active:scale-[0.98]"
          >
            <span>Open in TV</span>
            <svg
              className="h-3.5 w-3.5 text-blue-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="min-h-0 flex-1 relative">
        {showDiff && leftCode && rightCode ? (
          <DiffEditor
            height="100%"
            language="pine"
            original={leftCode}
            modified={rightCode}
            theme="pine-dark"
            beforeMount={handleBeforeMount}
            options={{
              readOnly: true,
              renderSideBySide: true,
              ignoreTrimWhitespace: false,
              minimap: { enabled: false },
              fontSize: 13,
              automaticLayout: true,
            }}
          />
        ) : (
          <Editor
            height="100%"
            language="pine"
            value={code}
            theme="pine-dark"
            onChange={onChange}
            beforeMount={handleBeforeMount}
            onMount={handleEditorDidMount}
            options={{
              readOnly,
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              renderLineHighlight: "gutter",
              smoothScrolling: true,
              cursorBlinking: "smooth",
              inlineSuggest: { enabled: true },
              suggestOnTriggerCharacters: true,
              padding: { top: 12 },
              bracketPairColorization: { enabled: true },
            }}
          />
        )}
      </div>
    </div>
  );
}
