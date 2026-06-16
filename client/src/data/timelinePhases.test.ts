import { describe, expect, it } from "vitest";
import { TIMELINE_PHASES, timelineTotals } from "./timelinePhases";

describe("timelinePhases", () => {
  it("tracks all 48 official roadmap milestones", () => {
    const { total } = timelineTotals(TIMELINE_PHASES);
    expect(total).toBe(48);
  });

  it("marks MVP phase as fully shipped", () => {
    const mvp = TIMELINE_PHASES.find((phase) => phase.id === "mvp");
    expect(mvp?.status).toBe("complete");
    expect(mvp?.progress).toBe(100);
  });

  it("reflects early Graphify and Monaco wins outside strict phase order", () => {
    const intelligence = TIMELINE_PHASES.find((phase) => phase.id === "intelligence");
    const launch = TIMELINE_PHASES.find((phase) => phase.id === "launch");

    expect(intelligence?.milestones.find((m) => m.id === "m20")?.done).toBe(true);
    expect(launch?.milestones.find((m) => m.id === "m40")?.done).toBe(true);
    expect(launch?.milestones.find((m) => m.id === "m43")?.done).toBe(true);
  });
});
