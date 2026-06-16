export type PhaseStatus = "complete" | "active" | "upcoming";

export type TimelineMilestone = {
  id: string;
  task: string;
  done: boolean;
};

export type TimelinePhase = {
  id: string;
  label: string;
  tag: string;
  weeks: string;
  dateRange: string;
  status: PhaseStatus;
  color: string;
  borderColor: string;
  progress: number;
  headline: string;
  milestones: TimelineMilestone[];
  deliverable: string;
};

function progressFromMilestones(milestones: TimelineMilestone[]): number {
  if (milestones.length === 0) {
    return 0;
  }

  const done = milestones.filter((milestone) => milestone.done).length;
  return Math.round((done / milestones.length) * 100);
}

function withProgress(phase: Omit<TimelinePhase, "progress">): TimelinePhase {
  return { ...phase, progress: progressFromMilestones(phase.milestones) };
}

export const TIMELINE_PHASES: TimelinePhase[] = [
  withProgress({
    id: "mvp",
    label: "MVP",
    tag: "m01–m12",
    weeks: "Week 1–2",
    dateRange: "May 26 – Jun 10",
    status: "complete",
    color: "#6A9955",
    borderColor: "#4EC9B0",
    headline: "Stream. Validate. Ship.",
    milestones: [
      { id: "m01", task: "Project setup — Rails 8 API + PostgreSQL schema", done: true },
      { id: "m02", task: "Monaco integration — pine-dark theme, IntelliSense, diff view", done: true },
      { id: "m03", task: "Generation API — SSE streaming endpoint", done: true },
      { id: "m04", task: "Ollama integration — cloud constant + local fallback router", done: true },
      { id: "m05", task: "Pine validation — Pine::Validator + inline squiggles", done: true },
      { id: "m06", task: "Repair loops — auto-fix on validation failure", done: true },
      { id: "m07", task: "Persistence — Indicator + GenerationSession models", done: true },
      { id: "m08", task: "Version snapshots — IndicatorVersion, IndicatorVersionCreator, prompt_delta, row lock", done: true },
      { id: "m09", task: "Diffs — GET versions/diff API + Monaco DiffEditor + restore_version", done: true },
      { id: "m10", task: "Metadata extraction — ExtractMetadataJob", done: true },
      { id: "m11", task: "Export support — download .pine file", done: true },
      { id: "m12", task: "Dashboard — AppShell, generator, sidebar, editor", done: true },
    ],
    deliverable: "Immutable version snapshots on every generate/refine. Diff + restore wired to Monaco.",
  }),
  withProgress({
    id: "intelligence",
    label: "Intelligence",
    tag: "m13–m24",
    weeks: "Week 3–4",
    dateRange: "Jun 11 – Jun 30",
    status: "active",
    color: "#DCDCAA",
    borderColor: "#DCDCAA",
    headline: "Graph. Retrieve. Understand.",
    milestones: [
      { id: "m13", task: "AST parser — Pine Script syntax tree", done: false },
      { id: "m14", task: "Dependency graphs — module/import relationships", done: false },
      { id: "m15", task: "Call graphs — service execution paths", done: false },
      { id: "m16", task: "Community detection — graph clustering", done: false },
      { id: "m17", task: "Graph persistence — committed graphify-out/graph.json", done: true },
      { id: "m18", task: "Similarity search — cross-indicator retrieval", done: false },
      { id: "m19", task: "Documentation ingestion — pine_v6_rules + examples", done: true },
      { id: "m20", task: "Retrieval — Graphify::ContextService BFS query", done: true },
      { id: "m21", task: "Prompt builder — graph-aware Prompts::Builder", done: true },
      { id: "m22", task: "Validation insights — richer diagnostic messages", done: false },
      { id: "m23", task: "Explainability — graphify explain for refinements", done: false },
      { id: "m24", task: "Quality scoring — generated code confidence metrics", done: false },
    ],
    deliverable: "Graphify RAG live. Pine v6 context injected per prompt. AST + insights remain.",
  }),
  withProgress({
    id: "platform",
    label: "Platform",
    tag: "m25–m36",
    weeks: "Week 5–6",
    dateRange: "Jul 1 – Jul 21",
    status: "active",
    color: "#569CD6",
    borderColor: "#2962FF",
    headline: "Scale. Observe. Automate.",
    milestones: [
      { id: "m25", task: "pgvector — embedding-backed similarity", done: false },
      { id: "m26", task: "Ingestion pipeline — automated doc refresh", done: false },
      { id: "m27", task: "Graphify — agent skills, hooks, MCP docs, ADR-0003", done: true },
      { id: "m28", task: "DeepSeek reasoning — CoT mode for complex prompts", done: false },
      { id: "m29", task: "Export improvements — richer metadata in exports", done: false },
      { id: "m30", task: "GitHub impact analysis — graphify-impact CI workflow", done: true },
      { id: "m31", task: "Callflow exports — architecture HTML diagrams", done: false },
      { id: "m32", task: "Wiki generation — navigable graphify wiki", done: false },
      { id: "m33", task: "Context tuning — GRAPHIFY_TOKEN_BUDGET optimization", done: false },
      { id: "m34", task: "Router metrics — model, source, elapsed_ms logging", done: true },
      { id: "m35", task: "PR triage — graphify prs in CI + dev docs", done: true },
      { id: "m36", task: "Merge intelligence — community conflict detection", done: false },
    ],
    deliverable: "CI graph impact checks. Observable LLM routing. pgvector + CoT still open.",
  }),
  withProgress({
    id: "launch",
    label: "Launch",
    tag: "m37–m48",
    weeks: "Week 7–8",
    dateRange: "Jul 22 – Aug 15",
    status: "upcoming",
    color: "#C586C0",
    borderColor: "#C586C0",
    headline: "Publish. Complete. Ship v1.0.",
    milestones: [
      { id: "m37", task: "Public sharing — shareable indicator URLs", done: false },
      { id: "m38", task: "Embeds — iframe widget for blogs/docs", done: false },
      { id: "m39", task: "Equity previews — strategy backtest mock", done: false },
      { id: "m40", task: "Ghost completions — inline Copilot-style tab accept", done: true },
      { id: "m41", task: "Federation — cross-project graph nodes", done: false },
      { id: "m42", task: "Enhanced conflict checks — prs --conflicts automation", done: false },
      { id: "m43", task: "Open in TradingView — clipboard + new tab", done: true },
      { id: "m44", task: "Usage metering — rate limits per user", done: false },
      { id: "m45", task: "Docker Compose — one-command dev stack", done: false },
      { id: "m46", task: "Documentation — full operator + contributor guides", done: false },
      { id: "m47", task: "Release notes — v1.0 GitHub release", done: false },
      { id: "m48", task: "Production sign-off — security + deploy checklist", done: false },
    ],
    deliverable: "v1.0 ships. Public sharing. Ghost text + TV handoff already landed early.",
  }),
];

export function timelineTotals(phases: TimelinePhase[] = TIMELINE_PHASES) {
  const milestones = phases.flatMap((phase) => phase.milestones);
  const done = milestones.filter((milestone) => milestone.done).length;

  return {
    done,
    total: milestones.length,
    percent: milestones.length === 0 ? 0 : Math.round((done / milestones.length) * 100),
  };
}
