import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PromptPanel } from "./PromptPanel";

describe("PromptPanel", () => {
  it("calls onRephrase when the rephrase button is clicked", () => {
    const onRephrase = vi.fn();

    render(
      <PromptPanel
        prompt="rsi indicator"
        onPromptChange={vi.fn()}
        onGenerate={vi.fn()}
        onRefine={vi.fn()}
        onRephrase={onRephrase}
        status="idle"
        onCancel={vi.fn()}
        hasExisting={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Rephrase" }));

    expect(onRephrase).toHaveBeenCalled();
  });

  it("disables rephrase while rephrasing", () => {
    render(
      <PromptPanel
        prompt="rsi indicator"
        onPromptChange={vi.fn()}
        onGenerate={vi.fn()}
        onRefine={vi.fn()}
        onRephrase={vi.fn()}
        status="idle"
        rephrasing
        onCancel={vi.fn()}
        hasExisting={false}
      />
    );

    expect(screen.getByRole("button", { name: "Rephrasing..." })).toBeDisabled();
  });
});
