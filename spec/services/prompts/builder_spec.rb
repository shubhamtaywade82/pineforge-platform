# frozen_string_literal: true

require "rails_helper"

RSpec.describe Prompts::Builder do
  describe "#system_prompt" do
    it "includes graph context when available" do
      allow(Graphify::ContextService).to receive(:fetch).and_return("ta.rsi(source, length)")

      builder = described_class.new(prompt: "build rsi", script_type: "indicator")
      prompt = builder.system_prompt

      expect(prompt).to include("RELEVANT PINE v6 GRAPH CONTEXT")
      expect(prompt).to include("ta.rsi(source, length)")
    end

    it "returns base prompt when graph context is blank" do
      allow(Graphify::ContextService).to receive(:fetch).and_return("")

      builder = described_class.new(prompt: "build rsi", script_type: "indicator")
      prompt = builder.system_prompt

      expect(prompt).not_to include("RELEVANT PINE v6 GRAPH CONTEXT")
      expect(prompt).to include("Pine Script v6")
    end
  end
end
