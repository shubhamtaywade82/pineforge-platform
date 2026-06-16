import { useState } from "react";
import type { IndicatorSummary } from "../../types";

type SidebarProps = {
  indicators: IndicatorSummary[];
  loading: boolean;
  error: string | null;
  onOpenTimeline?: () => void;
  onDeleteIndicator?: (id: string) => void;
  deletingIndicatorId?: string | null;
  onSelectIndicator?: (id: string) => void;
  activeIndicatorId?: string | null;
  onCollapse?: () => void;
};

export function Sidebar({
  indicators,
  loading,
  error,
  onOpenTimeline,
  onDeleteIndicator,
  deletingIndicatorId = null,
  onSelectIndicator,
  activeIndicatorId = null,
  onCollapse,
}: SidebarProps) {
  const [search, setSearch] = useState("");

  const filteredIndicators = indicators.filter((entry) =>
    entry.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col bg-[#070A13] font-sans">
      {/* Header section */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-[#0B0F19]/40">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Saved Indicators
        </span>
        <div className="flex items-center gap-2">
          {onOpenTimeline ? (
            <button
              type="button"
              onClick={onOpenTimeline}
              className="flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300 transition-all hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-400"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Timeline
            </button>
          ) : null}
          {onCollapse ? (
            <button
              type="button"
              onClick={onCollapse}
              title="Collapse Sidebar"
              className="rounded-md border border-slate-800 bg-slate-900/60 p-1 text-slate-400 hover:border-slate-700 hover:bg-slate-800/50 hover:text-slate-200 transition-all"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-shrink-0 border-b border-slate-800/80 p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search indicator..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-[#0E1322] py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Main Indicators List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
            <span className="ml-2 text-xs text-slate-400">Loading scripts...</span>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-red-950/40 bg-red-950/10 p-3 text-xs text-red-400">
            {error}
          </div>
        ) : null}

        {!loading && filteredIndicators.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            {search ? "No scripts found matching query" : "No saved scripts yet"}
          </div>
        ) : null}

        <ul className="space-y-1.5">
          {filteredIndicators.map((indicator) => {
            const isActive = activeIndicatorId === indicator.id;
            const isDeleting = deletingIndicatorId === indicator.id;

            // Icon and badges based on script type
            let badgeBg = "bg-sky-500/10 text-sky-400 border-sky-500/20";
            let typeAbbr = "IND";
            if (indicator.script_type === "strategy") {
              badgeBg = "bg-purple-500/10 text-purple-400 border-purple-500/20";
              typeAbbr = "STR";
            } else if (indicator.script_type === "library") {
              badgeBg = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
              typeAbbr = "LIB";
            }

            return (
              <li
                key={indicator.id}
                className={`group relative rounded-xl border p-3 transition-all cursor-pointer ${
                  isActive
                    ? "border-blue-500/60 bg-blue-600/5 shadow-md shadow-blue-500/5"
                    : "border-slate-800/80 bg-slate-900/20 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
                onClick={() => onSelectIndicator?.(indicator.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className={`rounded border px-1 py-0.5 text-[8px] font-extrabold tracking-wider ${badgeBg}`}
                      >
                        {typeAbbr}
                      </span>
                      <span
                        className={`truncate text-xs font-semibold ${
                          isActive ? "text-blue-300" : "text-slate-200 group-hover:text-slate-100"
                        }`}
                      >
                        {indicator.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="capitalize">{indicator.status}</span>
                      <span>•</span>
                      <span>
                        {new Date(indicator.updated_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Absolute or relative Delete Button */}
                  {onDeleteIndicator ? (
                    <button
                      type="button"
                      aria-label={`Delete ${indicator.name}`}
                      disabled={isDeleting}
                      onClick={(event) => {
                        event.stopPropagation(); // Avoid selecting the card
                        onDeleteIndicator(indicator.id);
                      }}
                      className="rounded-lg border border-transparent p-1.5 text-slate-500 opacity-0 transition-all hover:border-red-950 hover:bg-red-950/30 hover:text-red-400 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border border-slate-600 border-t-red-400" />
                      ) : (
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      )}
                    </button>
                  ) : null}
                </div>

                {/* Left indicator glow line */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-blue-500" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
