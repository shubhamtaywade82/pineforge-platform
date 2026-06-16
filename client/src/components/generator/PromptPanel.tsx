import type { StreamStatus } from "../../types";

type PromptPanelProps = {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  onRefine: (value: string) => void;
  onRephrase: () => void;
  status: StreamStatus;
  rephrasing?: boolean;
  rephraseError?: string | null;
  onCancel: () => void;
  hasExisting: boolean;
};

export function PromptPanel({
  prompt,
  onPromptChange,
  onGenerate,
  onRefine,
  onRephrase,
  status,
  rephrasing = false,
  rephraseError = null,
  onCancel,
  hasExisting,
}: PromptPanelProps) {
  const busy = status === "streaming" || rephrasing;
  const canSubmit = prompt.trim().length > 0 && !busy;

  return (
    <div className="flex flex-col gap-4 p-4.5 bg-[#070A13]">
      {/* Prompt Label & Rephrase */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          AI Instructions
        </label>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onRephrase}
          aria-label={rephrasing ? "Rephrasing..." : "Rephrase"}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-indigo-600/10 hover:text-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {rephrasing ? (
            <>
              <div className="h-3 w-3 animate-spin rounded-full border border-slate-500 border-t-indigo-400" />
              Rephrasing...
            </>
          ) : (
            <>
              <span className="text-[11px]">✨</span>
              Rephrase
            </>
          )}
        </button>
      </div>

      {/* Textarea container */}
      <div className="relative">
        <textarea
          className="w-full min-h-36 resize-none rounded-xl border border-slate-800 bg-[#0E1322] p-3.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder="Describe the Pine Script v6 indicator, strategy, or library in plain language..."
          disabled={busy}
        />
        {/* Character count helper */}
        <div className="absolute bottom-2.5 right-3 text-[9px] font-medium text-slate-500">
          {prompt.length} chars
        </div>
      </div>

      {rephraseError ? (
        <p className="rounded-lg border border-red-950/40 bg-red-950/10 px-3 py-2 text-[10px] text-red-400">
          {rephraseError}
        </p>
      ) : null}

      {/* Button controls */}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onGenerate}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Generate
        </button>

        {status === "streaming" ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-red-900 bg-red-950/20 px-3.5 py-2.5 text-xs font-bold text-red-400 transition-all hover:bg-red-950/40 hover:text-red-300"
          >
            Cancel
          </button>
        ) : null}
      </div>

      {hasExisting ? (
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => onRefine(prompt)}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/40 py-2.5 text-xs font-bold text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-900/60 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            className="h-3.5 w-3.5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Refine Current Script
        </button>
      ) : null}
    </div>
  );
}
