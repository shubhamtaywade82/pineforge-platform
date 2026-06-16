import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VersionHistoryPanel } from "./VersionHistoryPanel";
import type { IndicatorVersion } from "../../types";

const versions: IndicatorVersion[] = [
  {
    id: "v1",
    version_number: 1,
    code: "code v1",
    prompt_delta: null,
    created_at: "2025-06-16T00:00:00Z",
  },
  {
    id: "v2",
    version_number: 2,
    code: "code v2",
    prompt_delta: "Add RSI",
    created_at: "2025-06-16T01:00:00Z",
  },
];

describe("VersionHistoryPanel", () => {
  it("renders prompt deltas", () => {
    render(
      <VersionHistoryPanel
        versions={versions}
        leftVersion={versions[0]}
        rightVersion={versions[1]}
        onSelectVersion={vi.fn()}
      />
    );

    expect(screen.getByText("Initial generation")).toBeInTheDocument();
    expect(screen.getByText("Add RSI")).toBeInTheDocument();
  });

  it("calls onSelectVersion when a version is clicked", () => {
    const onSelectVersion = vi.fn();

    render(
      <VersionHistoryPanel
        versions={versions}
        onSelectVersion={onSelectVersion}
      />
    );

    fireEvent.click(screen.getByText("Version 2"));

    expect(onSelectVersion).toHaveBeenCalledWith(versions[1]);
  });

  it("calls onCompare when compare is clicked", () => {
    const onCompare = vi.fn();

    render(
      <VersionHistoryPanel
        versions={versions}
        onSelectVersion={vi.fn()}
        onCompare={onCompare}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Compare" }));

    expect(onCompare).toHaveBeenCalled();
  });
});
