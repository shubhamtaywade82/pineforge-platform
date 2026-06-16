import type { ScriptType } from "../../types";

type ScriptTypeTabsProps = {
  value: ScriptType;
  onChange: (value: ScriptType) => void;
};

const OPTIONS: ScriptType[] = ["indicator", "strategy", "library"];

export function ScriptTypeTabs({ value, onChange }: ScriptTypeTabsProps) {
  return (
    <div className="flex border-b border-gray-800">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={`flex-1 px-3 py-2 text-xs uppercase tracking-wide ${
            value === option ? "bg-gray-800 text-white" : "text-gray-400"
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
