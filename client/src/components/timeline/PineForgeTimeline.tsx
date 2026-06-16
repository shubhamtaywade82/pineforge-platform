import { useEffect, useState } from "react";
import {
  TIMELINE_PHASES,
  timelineTotals,
  type PhaseStatus,
  type TimelinePhase,
} from "../../data/timelinePhases";

const STATUS_LABEL: Record<PhaseStatus, string> = {
  complete: "SHIPPED",
  active: "IN PROGRESS",
  upcoming: "PLANNED",
};

type VolumeBarProps = {
  progress: number;
  color: string;
  status: PhaseStatus;
};

function VolumeBar({ progress, color, status }: VolumeBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setWidth(progress), 200);
    return () => window.clearTimeout(timer);
  }, [progress]);

  return (
    <div className="relative h-[3px] overflow-hidden rounded-sm bg-[#1C2128]">
      <div
        className="absolute left-0 top-0 h-full rounded-sm transition-[width] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: `${width}%`,
          background: color,
          boxShadow: status === "active" ? `0 0 8px ${color}80` : undefined,
        }}
      />
    </div>
  );
}

type MilestoneCardProps = {
  phase: TimelinePhase;
  index: number;
};

function MilestoneCard({ phase, index }: MilestoneCardProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), index * 120);
    return () => window.clearTimeout(timer);
  }, [index]);

  const doneCount = phase.milestones.filter((milestone) => milestone.done).length;
  const total = phase.milestones.length;
  const borderColor = expanded || hovered ? phase.borderColor : "#30363D";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setExpanded((previous) => !previous)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setExpanded((previous) => !previous);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[280px] shrink-0 cursor-pointer select-none rounded-lg border p-5 transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        background: "#161B22",
        borderColor,
        boxShadow: expanded
          ? `0 0 0 1px ${phase.borderColor}30, 0 8px 24px #00000060`
          : hovered
            ? `0 0 0 1px ${phase.borderColor}40, 0 4px 16px #00000050`
            : "0 2px 8px #00000040",
      }}
    >
      <div className="mb-3.5 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span
              className="rounded px-1.5 py-0.5 font-mono text-[11px] font-bold tracking-widest"
              style={{
                color: phase.color,
                background: `${phase.color}18`,
                border: `1px solid ${phase.color}40`,
              }}
            >
              {phase.label}
            </span>
            <span className="rounded border border-[#30363D] bg-[#1C2128] px-1.5 py-0.5 font-mono text-[10px] text-[#8B949E]">
              {phase.tag}
            </span>
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-[#8B949E]">{phase.dateRange}</div>
        </div>
        <span
          className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest"
          style={{
            color:
              phase.status === "complete"
                ? "#4EC9B0"
                : phase.status === "active"
                  ? "#DCDCAA"
                  : "#495162",
            background:
              phase.status === "complete"
                ? "#4EC9B018"
                : phase.status === "active"
                  ? "#DCDCAA18"
                  : "#1C2128",
            border: `1px solid ${
              phase.status === "complete"
                ? "#4EC9B030"
                : phase.status === "active"
                  ? "#DCDCAA30"
                  : "#30363D"
            }`,
          }}
        >
          {STATUS_LABEL[phase.status]}
        </span>
      </div>

      <div className="mb-3.5 font-mono text-sm font-bold leading-snug text-[#E6EDF3]">
        {phase.headline}
      </div>

      <div className="mb-2.5">
        <VolumeBar progress={phase.progress} color={phase.color} status={phase.status} />
      </div>

      <div className="mb-4 flex justify-between font-mono text-[10px]">
        <span className="text-[#8B949E]">
          {doneCount} / {total} milestones
        </span>
        <span style={{ color: phase.color }}>{phase.progress}%</span>
      </div>

      <div
        className="overflow-hidden transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: expanded ? "640px" : "0px" }}
      >
        <div className="mb-3.5 border-t border-[#21262D] pt-3.5">
          {phase.milestones.map((milestone) => (
            <div key={milestone.id} className="mb-2 flex items-start gap-2">
              <span
                className="mt-px flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border text-[9px]"
                style={{
                  borderColor: milestone.done ? phase.color : "#30363D",
                  background: milestone.done ? `${phase.color}20` : "transparent",
                  color: phase.color,
                }}
              >
                {milestone.done ? "✓" : ""}
              </span>
              <span
                className="font-mono text-[11px] leading-snug"
                style={{ color: milestone.done ? "#8B949E" : "#C9D1D9" }}
              >
                {milestone.task}
              </span>
            </div>
          ))}
        </div>

        <div
          className="rounded border border-l-[3px] px-3 py-2.5"
          style={{
            background: "#0D1117",
            borderColor: `${phase.borderColor}30`,
            borderLeftColor: phase.color,
          }}
        >
          <div className="mb-1 font-mono text-[9px] tracking-widest text-[#8B949E]">DELIVERABLE</div>
          <div className="font-mono text-[11px] leading-snug text-[#C9D1D9]">{phase.deliverable}</div>
        </div>
      </div>

      <div className="mt-3 text-center font-mono text-[10px] tracking-widest text-[#495162]">
        {expanded ? "▲ collapse" : "▼ show milestones"}
      </div>
    </div>
  );
}

function ConnectorLine({ toPhase }: { toPhase: TimelinePhase }) {
  return (
    <div className="flex shrink-0 items-center self-start pt-[68px]">
      <div className="h-px w-5 bg-[#30363D]" />
      <div
        className="h-1.5 w-1.5 rounded-full border bg-[#0D1117]"
        style={{ borderColor: toPhase.borderColor }}
      />
      <div className="h-px w-5 bg-[#30363D]" />
    </div>
  );
}

function WeekTick({ phase }: { phase: TimelinePhase }) {
  return (
    <div className="mb-2 flex w-[280px] shrink-0 items-center gap-1.5">
      <span className="font-mono text-[10px] tracking-widest text-[#495162]">{phase.weeks}</span>
      <div className="h-px flex-1 bg-[#21262D]" />
    </div>
  );
}

type PineForgeTimelineProps = {
  onBack?: () => void;
};

export function PineForgeTimeline({ onBack }: PineForgeTimelineProps) {
  const totals = timelineTotals(TIMELINE_PHASES);

  return (
    <div className="min-h-screen bg-[#0D1117] px-8 py-10 font-mono text-[#E6EDF3]">
      <div className="mb-10 max-w-4xl">
        <div className="mb-2.5 flex items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="rounded border border-[#30363D] bg-[#161B22] px-2.5 py-1 font-mono text-[10px] tracking-widest text-[#8B949E] transition-colors hover:border-[#2962FF] hover:text-[#E6EDF3]"
            >
              ← EDITOR
            </button>
          ) : null}
          <span className="rounded border border-[#2962FF40] bg-[#2962FF18] px-2 py-0.5 text-[11px] font-bold tracking-widest text-[#2962FF]">
            PINEFORGE
          </span>
          <span className="text-[11px] tracking-widest text-[#495162]">PROJECT TIMELINE</span>
        </div>

        <h1 className="mb-2.5 text-[28px] font-bold leading-tight tracking-tight">
          MVP → v1.0 in <span className="text-[#2962FF]">8 weeks</span>
        </h1>
        <p className="max-w-xl text-[13px] leading-relaxed text-[#8B949E]">
          4 phases · 48 milestones · Rails 8 + React + Ollama Cloud + Graphify
        </p>

        <div className="mt-5 max-w-md">
          <div className="mb-1.5 flex justify-between font-mono text-[10px] tracking-widest">
            <span className="text-[#8B949E]">OVERALL PROGRESS</span>
            <span className="text-[#4EC9B0]">
              {totals.done}/{totals.total} milestones · {totals.percent}%
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-sm bg-[#1C2128]">
            <div
              className="h-full rounded-sm bg-gradient-to-r from-[#2962FF] to-[#4EC9B0] transition-[width] duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${totals.percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-3 text-[9px] tracking-[0.15em] text-[#495162]">
        CLICK ANY PHASE TO EXPAND MILESTONES ↓
      </div>

      <div className="overflow-x-auto pb-5">
        <div className="flex items-end">
          {TIMELINE_PHASES.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <WeekTick phase={phase} />
              {index < TIMELINE_PHASES.length - 1 ? <div className="w-[46px] shrink-0" /> : null}
            </div>
          ))}
        </div>

        <div className="relative mb-8 flex items-start">
          <div
            className="pointer-events-none absolute left-4 right-4 top-[63px] h-px"
            style={{
              background: "linear-gradient(90deg, #2962FF30, #4EC9B030, #C586C030)",
            }}
          />

          {TIMELINE_PHASES.map((phase, index) => (
            <div key={phase.id} className="flex items-start">
              <div>
                <div className="relative mb-2.5 flex justify-center">
                  <div
                    className="relative z-10 h-2.5 w-2.5 rounded-full border-2"
                    style={{
                      background: phase.status === "upcoming" ? "#0D1117" : phase.color,
                      borderColor: phase.color,
                      boxShadow: phase.status === "active" ? `0 0 12px ${phase.color}80` : undefined,
                    }}
                  />
                </div>
                <div
                  className="mx-auto mb-1.5 h-4 w-px"
                  style={{ background: `${phase.borderColor}50` }}
                />
                <MilestoneCard phase={phase} index={index} />
              </div>
              {index < TIMELINE_PHASES.length - 1 ? (
                <ConnectorLine toPhase={TIMELINE_PHASES[index + 1]} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-5 border-t border-[#21262D] pt-5">
        {[
          { color: "#4EC9B0", label: "Shipped" },
          { color: "#DCDCAA", label: "In progress", glow: true },
          { color: "#495162", label: "Planned" },
        ].map(({ color, label, glow }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background: color,
                boxShadow: glow ? `0 0 8px ${color}` : undefined,
              }}
            />
            <span className="text-[11px] text-[#8B949E]">{label}</span>
          </div>
        ))}
        <div className="ml-auto text-[11px] text-[#495162]">PineForge · May – Aug 2026</div>
      </div>
    </div>
  );
}
