import type { IndicatorVersion } from "../../types";

type VersionHistoryPanelProps = {
  versions: IndicatorVersion[];
  leftVersion?: IndicatorVersion;
  rightVersion?: IndicatorVersion;
  loading?: boolean;
  error?: string | null;
  onSelectVersion: (version: IndicatorVersion) => void;
  onCompare?: () => void;
};

export function VersionHistoryPanel({
  versions,
  leftVersion,
  rightVersion,
  loading = false,
  error = null,
  onSelectVersion,
  onCompare,
}: VersionHistoryPanelProps) {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 border-t border-slate-800 bg-[#070A13]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
        <span className="ml-2 text-xs text-slate-400 font-medium">Loading versions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t border-slate-800 bg-[#070A13] p-4 text-xs text-red-400">{error}</div>
    );
  }

  if (versions.length === 0) {
    return null;
  }

  return (
    <div className="flex-shrink-0 border-t border-slate-800/80 bg-[#070A13] p-4">
      {/* Title Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Version History
        </span>
        {versions.length >= 2 && onCompare ? (
          <button
            type="button"
            onClick={onCompare}
            className="flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300 transition-all hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-400"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            Compare
          </button>
        ) : null}
      </div>

      {/* Version Card List */}
      <ul className="max-h-48 space-y-2 overflow-y-auto custom-scrollbar pr-0.5">
        {versions.map((version) => {
          const isLeft = leftVersion?.id === version.id;
          const isRight = rightVersion?.id === version.id;
          const isActive = isLeft || isRight;

          return (
            <li key={version.id}>
              <button
                type="button"
                onClick={() => onSelectVersion(version)}
                className={`w-full rounded-xl border p-2.5 text-left text-xs transition-all outline-none ${
                  isActive
                    ? "border-blue-500/50 bg-blue-600/5 shadow-md shadow-blue-500/5"
                    : "border-slate-800 bg-slate-900/10 text-slate-300 hover:border-slate-700 hover:bg-slate-900/35"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span
                    className={`font-semibold ${
                      isActive ? "text-blue-300" : "text-slate-200"
                    }`}
                  >
                    Version {version.version_number}
                  </span>
                  <div className="flex gap-1.5">
                    {isLeft ? (
                      <span className="rounded bg-blue-500/15 border border-blue-500/25 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-blue-400 uppercase">
                        LEFT
                      </span>
                    ) : null}
                    {isRight ? (
                      <span className="rounded bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-emerald-400 uppercase">
                        RIGHT
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="rounded bg-slate-950/30 border border-slate-900/50 px-2 py-1 text-[11px] text-slate-400 leading-normal">
                  {version.prompt_delta ?? "Initial generation"}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
