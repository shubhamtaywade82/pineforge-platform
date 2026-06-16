import type { StreamStatus as StreamStatusValue } from "../../types";

type StreamStatusProps = {
  status: StreamStatusValue;
  metadata?: {
    validation?: { passed: boolean };
    version?: number;
  };
};

export function StreamStatus({ status, metadata }: StreamStatusProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2 text-xs text-gray-400">
      <span>Status: {status}</span>
      {metadata?.version ? <span>Version {metadata.version}</span> : null}
      {metadata?.validation ? (
        <span>{metadata.validation.passed ? "Validation passed" : "Validation failed"}</span>
      ) : null}
    </div>
  );
}
