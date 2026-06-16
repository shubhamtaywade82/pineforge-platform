import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";

const indicators = [
  {
    id: "indicator-1",
    name: "RSI Momentum",
    script_type: "indicator" as const,
    status: "complete",
    updated_at: "2025-06-16T00:00:00Z",
  },
];

describe("Sidebar", () => {
  it("calls onDeleteIndicator when delete is clicked", () => {
    const onDeleteIndicator = vi.fn();

    render(
      <Sidebar
        indicators={indicators}
        loading={false}
        error={null}
        onDeleteIndicator={onDeleteIndicator}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete RSI Momentum" }));

    expect(onDeleteIndicator).toHaveBeenCalledWith("indicator-1");
  });
});
