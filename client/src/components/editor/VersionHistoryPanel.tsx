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
      <div className="border-t border-gray-800 p-4 text-xs text-gray-500">Loading versions...</div>
    );
  }

  if (error) {
    return (
      <div className="border-t border-gray-800 p-4 text-xs text-red-400">{error}</div>
    );
  }

  if (versions.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-800 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-500">Version History</div>
        {versions.length >= 2 && onCompare ? (
          <button
            type="button"
            onClick={onCompare}
            className="rounded border border-gray-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-400 transition-colors hover:border-blue-500 hover:text-blue-300"
          >
            Compare
          </button>
        ) : null}
      </div>

      <ul className="max-h-48 space-y-2 overflow-y-auto">
        {versions.map((version) => {
          const isLeft = leftVersion?.id === version.id;
          const isRight = rightVersion?.id === version.id;
          const isActive = isLeft || isRight;

          return (
            <li key={version.id}>
              <button
                type="button"
                onClick={() => onSelectVersion(version)}
                className={`w-full rounded border p-2 text-left text-xs transition-colors ${
                  isActive
                    ? "border-blue-500 bg-blue-950/20 text-gray-100"
                    : "border-gray-800 text-gray-300 hover:border-gray-700"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <strong>Version {version.version_number}</strong>
                  {isLeft ? <span className="text-[10px] text-blue-400">LEFT</span> : null}
                  {isRight ? <span className="text-[10px] text-green-400">RIGHT</span> : null}
                </div>
                <p className="text-gray-500">{version.prompt_delta ?? "Initial generation"}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
