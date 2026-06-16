import type { ScriptType } from "../../types";

type ScriptTypeTabsProps = {
  value: ScriptType;
  onChange: (value: ScriptType) => void;
};

const OPTIONS: ScriptType[] = ["indicator", "strategy", "library"];

export function ScriptTypeTabs({ value, onChange }: ScriptTypeTabsProps) {
  const selectedIndex = OPTIONS.indexOf(value);

  return (
    <div className="flex-shrink-0 bg-[#070A13] p-3.5 border-b border-slate-800/80">
      <div className="relative flex rounded-xl bg-[#0E1322] p-1 border border-slate-800/60">
        {/* Sliding background pill indicator */}
        <div
          className="absolute bottom-1 top-1 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-blue-500/15 transition-all duration-300 ease-out"
          style={{
            width: "calc(33.333% - 6px)",
            transform: `translateX(calc(${selectedIndex * 100}% + ${selectedIndex * 4}px))`,
          }}
        />

        {OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={`relative flex-1 py-2 text-center text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-200 z-10 outline-none ${
              value === option ? "text-white" : "text-slate-400 hover:text-slate-300"
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
