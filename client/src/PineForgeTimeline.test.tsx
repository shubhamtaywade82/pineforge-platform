import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PineForgeTimeline } from "./components/timeline/PineForgeTimeline";

describe("PineForgeTimeline", () => {
  it("renders phase headers and overall progress", () => {
    render(<PineForgeTimeline />);

    expect(screen.getByText("PROJECT TIMELINE")).toBeInTheDocument();
    expect(screen.getByText("OVERALL PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("MVP")).toBeInTheDocument();
    expect(screen.getByText("Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
  });

  it("calls onBack when editor button is clicked", () => {
    const onBack = vi.fn();
    render(<PineForgeTimeline onBack={onBack} />);

    screen.getByRole("button", { name: "← EDITOR" }).click();
    expect(onBack).toHaveBeenCalledOnce();
  });
});
