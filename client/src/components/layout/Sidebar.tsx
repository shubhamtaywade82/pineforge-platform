import type { IndicatorSummary } from "../../types";

type SidebarProps = {
  indicators: IndicatorSummary[];
  loading: boolean;
  error: string | null;
  onOpenTimeline?: () => void;
  onDeleteIndicator?: (id: string) => void;
  deletingIndicatorId?: string | null;
};

export function Sidebar({
  indicators,
  loading,
  error,
  onOpenTimeline,
  onDeleteIndicator,
  deletingIndicatorId = null,
}: SidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-800 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400">Saved Indicators</div>
        {onOpenTimeline ? (
          <button
            type="button"
            onClick={onOpenTimeline}
            className="rounded border border-gray-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-400 transition-colors hover:border-blue-500 hover:text-blue-300"
          >
            Timeline
          </button>
        ) : null}
      </div>
      {loading ? <div className="text-xs text-gray-500">Loading...</div> : null}
      {error ? <div className="text-xs text-red-400">{error}</div> : null}
      <ul className="space-y-2">
        {indicators.map((indicator) => (
          <li
            key={indicator.id}
            className="group rounded border border-gray-800 p-2 text-xs transition-colors hover:border-gray-700"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-medium text-gray-100">{indicator.name}</div>
                <div className="text-gray-500">
                  {indicator.script_type} · {indicator.status}
                </div>
              </div>
              {onDeleteIndicator ? (
                <button
                  type="button"
                  aria-label={`Delete ${indicator.name}`}
                  disabled={deletingIndicatorId === indicator.id}
                  onClick={() => onDeleteIndicator(indicator.id)}
                  className="rounded border border-transparent px-1 py-0.5 text-[10px] text-gray-500 opacity-0 transition-all hover:border-red-900 hover:bg-red-950/30 hover:text-red-400 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingIndicatorId === indicator.id ? "..." : "Delete"}
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
