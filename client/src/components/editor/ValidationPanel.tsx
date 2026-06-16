import type { ValidationResult } from "../../types";

type ValidationPanelProps = {
  validation?: ValidationResult;
};

export function ValidationPanel({ validation }: ValidationPanelProps) {
  if (!validation) {
    return null;
  }

  const { passed, errors, warnings } = validation;

  if (passed && warnings.length === 0) {
    return (
      <div className="flex h-9 flex-shrink-0 items-center gap-2 border-t border-emerald-900 bg-[#061C14] px-4 text-xs text-emerald-400">
        <svg
          className="h-4 w-4 text-emerald-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-semibold">Valid Pine Script v6</span>
      </div>
    );
  }

  // Parse line number helper (e.g., "Line 12: message" or "line 5, column 10: message")
  const parseIssue = (text: string) => {
    const lineRegex = /(?:Line|line)\s+(\d+)/i;
    const match = text.match(lineRegex);
    if (match) {
      const lineNum = match[1];
      const cleanedMessage = text.replace(/^(?:Line|line)\s+\d+:\s*/i, "");
      return { line: lineNum, message: cleanedMessage };
    }
    return { line: null, message: text };
  };

  return (
    <div className="max-h-48 overflow-y-auto border-t border-slate-800 bg-[#070A13] font-mono text-xs custom-scrollbar">
      {/* Header bar of validation drawer */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-800/80 bg-[#0B0F19]/90 px-4 py-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Console Diagnostics
        </span>
        {errors.length > 0 && (
          <span className="rounded-full bg-red-500/15 border border-red-500/20 px-2 py-0.5 text-[9px] font-bold text-red-400">
            {errors.length} error{errors.length === 1 ? "" : "s"}
          </span>
        )}
        {warnings.length > 0 && (
          <span className="rounded-full bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 text-[9px] font-bold text-amber-400">
            {warnings.length} warning{warnings.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {/* Issues list */}
      <div className="divide-y divide-slate-800/50">
        {errors.map((entry, index) => {
          const { line, message } = parseIssue(entry);

          return (
            <div
              key={`err-${index}`}
              className="flex items-start gap-3 bg-red-950/5 px-4 py-2 hover:bg-red-950/10 transition-colors"
            >
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-red-500/15 text-[10px] font-bold text-red-400">
                E
              </span>
              <div className="flex-1 min-w-0">
                {line && (
                  <span className="mr-2 rounded bg-slate-800/60 border border-slate-700/50 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">
                    Line {line}
                  </span>
                )}
                <span className="text-slate-300 leading-relaxed">{message}</span>
              </div>
            </div>
          );
        })}

        {warnings.map((entry, index) => {
          const { line, message } = parseIssue(entry);

          return (
            <div
              key={`warn-${index}`}
              className="flex items-start gap-3 bg-amber-950/5 px-4 py-2 hover:bg-amber-950/10 transition-colors"
            >
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-amber-500/15 text-[10px] font-bold text-amber-400">
                W
              </span>
              <div className="flex-1 min-w-0">
                {line && (
                  <span className="mr-2 rounded bg-slate-800/60 border border-slate-700/50 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">
                    Line {line}
                  </span>
                )}
                <span className="text-slate-400 leading-relaxed">{message}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
