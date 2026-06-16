import type { StreamStatus as StreamStatusValue } from "../../types";

type StreamStatusProps = {
  status: StreamStatusValue;
  metadata?: {
    validation?: { passed: boolean };
    version?: number;
    model?: string;
    source?: string;
  };
};

export function StreamStatus({ status, metadata }: StreamStatusProps) {
  const modelLabel =
    metadata?.model && metadata?.source
      ? `${metadata.model} (${metadata.source})`
      : metadata?.model;

  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2 text-xs text-gray-400">
      <span>Status: {status}</span>
      {modelLabel ? <span>{modelLabel}</span> : null}
      {metadata?.version ? <span>Version {metadata.version}</span> : null}
      {metadata?.validation ? (
        <span>{metadata.validation.passed ? "Validation passed" : "Validation failed"}</span>
      ) : null}
    </div>
  );
}
