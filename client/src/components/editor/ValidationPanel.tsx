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
      <div className="flex h-8 items-center border-t border-green-800 bg-green-900/30 px-4 text-xs text-green-400">
        Valid Pine Script v6
      </div>
    );
  }

  return (
    <div className="max-h-40 overflow-y-auto border-t border-gray-700 bg-[#0d1117]">
      {errors.map((entry) => (
        <div key={entry} className="flex gap-2 px-4 py-1 text-xs text-red-400">
          <span>x</span>
          <span>{entry}</span>
        </div>
      ))}
      {warnings.map((entry) => (
        <div key={entry} className="flex gap-2 px-4 py-1 text-xs text-yellow-400">
          <span>!</span>
          <span>{entry}</span>
        </div>
      ))}
    </div>
  );
}
