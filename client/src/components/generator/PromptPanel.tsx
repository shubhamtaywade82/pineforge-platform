import type { StreamStatus } from "../../types";

type PromptPanelProps = {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  onRefine: (value: string) => void;
  status: StreamStatus;
  onCancel: () => void;
  hasExisting: boolean;
};

export function PromptPanel({
  prompt,
  onPromptChange,
  onGenerate,
  onRefine,
  status,
  onCancel,
  hasExisting,
}: PromptPanelProps) {
  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      <label className="text-xs uppercase tracking-wide text-gray-400">Prompt</label>
      <textarea
        className="min-h-40 flex-1 resize-none rounded border border-gray-800 bg-[#161b22] p-3 text-sm text-gray-100 outline-none focus:border-blue-500"
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        placeholder="Describe the Pine Script v6 indicator, strategy, or library..."
      />
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
          disabled={status === "streaming" || prompt.trim().length === 0}
          onClick={onGenerate}
        >
          Generate
        </button>
        {status === "streaming" ? (
          <button
            type="button"
            className="rounded border border-gray-700 px-3 py-2 text-sm text-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
        ) : null}
      </div>
      {hasExisting ? (
        <button
          type="button"
          className="rounded border border-gray-700 px-3 py-2 text-sm text-gray-200 disabled:opacity-50"
          disabled={status === "streaming" || prompt.trim().length === 0}
          onClick={() => onRefine(prompt)}
        >
          Refine Current Script
        </button>
      ) : null}
    </div>
  );
}
