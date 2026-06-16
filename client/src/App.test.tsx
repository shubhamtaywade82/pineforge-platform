import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./hooks/useGenerator", () => ({
  useGenerator: () => ({
    scriptType: "indicator",
    setScriptType: vi.fn(),
    prompt: "",
    setPrompt: vi.fn(),
    generate: vi.fn(),
    refine: vi.fn(),
    cancel: vi.fn(),
    status: "idle",
    code: "",
    error: null,
    metadata: {},
    chatHistory: [],
    indicatorId: undefined,
  }),
}));

vi.mock("./hooks/useIndicators", () => ({
  useIndicators: () => ({
    indicators: [],
    loading: false,
    error: null,
    refresh: vi.fn(),
  }),
}));

describe("App", () => {
  it("renders the dashboard shell", () => {
    render(<App />);

    expect(screen.getByText("Saved Indicators")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeInTheDocument();
    expect(screen.getByText("Status: idle")).toBeInTheDocument();
  });
});
