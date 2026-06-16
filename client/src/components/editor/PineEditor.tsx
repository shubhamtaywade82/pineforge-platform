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
    <div className="relative flex h-full flex-col">
      <div className="flex h-9 flex-shrink-0 items-center justify-between border-b border-gray-800 bg-[#161B22] px-3">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="font-mono text-[#4EC9B0]">Pine Script v6</span>
          {validation && (
            <span className={validation.passed ? "text-green-500" : "text-red-400"}>
              {validation.passed
                ? "Valid"
                : `${validation.errors.length} error${validation.errors.length === 1 ? "" : "s"}`}
            </span>
          )}
          {showDiff && versions.length >= 2 ? (
            <div className="flex items-center gap-2">
              <select
                aria-label="Left version"
                value={leftVersionId}
                onChange={(event) => handleLeftVersionChange(event.target.value)}
                className="rounded border border-gray-700 bg-[#0d1117] px-1 py-0.5 text-[10px] text-gray-300"
              >
                {versions.map((version) => (
                  <option key={`left-${version.id}`} value={version.id}>
                    V{version.version_number}
                  </option>
                ))}
              </select>
              <span className="text-gray-600">vs</span>
              <select
                aria-label="Right version"
                value={rightVersionId}
                onChange={(event) => handleRightVersionChange(event.target.value)}
                className="rounded border border-gray-700 bg-[#0d1117] px-1 py-0.5 text-[10px] text-gray-300"
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

        <div className="flex items-center gap-2">
          {diffAvailable && onToggleDiff ? (
            <button
              type="button"
              onClick={onToggleDiff}
              className={`rounded border px-2 py-1 text-xs transition-colors ${
                showDiff
                  ? "border-blue-500 bg-blue-950/30 text-blue-400"
                  : "border-gray-700 text-gray-400 hover:text-gray-200"
              }`}
            >
              {showDiff ? "Editor" : "Diff"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void copyToClipboard()}
            className="rounded border border-gray-700 px-2 py-1 text-xs text-gray-400 transition-colors hover:text-gray-200"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => void openInTradingView()}
            className="rounded bg-blue-600 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-500"
          >
            Open in TV
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
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
