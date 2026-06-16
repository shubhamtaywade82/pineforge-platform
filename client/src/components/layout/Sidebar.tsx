import type { IndicatorSummary } from "../../types";

type SidebarProps = {
  indicators: IndicatorSummary[];
  loading: boolean;
  error: string | null;
  onOpenTimeline?: () => void;
};

export function Sidebar({ indicators, loading, error, onOpenTimeline }: SidebarProps) {
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
          <li key={indicator.id} className="rounded border border-gray-800 p-2 text-xs">
            <div className="font-medium text-gray-100">{indicator.name}</div>
            <div className="text-gray-500">
              {indicator.script_type} · {indicator.status}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
