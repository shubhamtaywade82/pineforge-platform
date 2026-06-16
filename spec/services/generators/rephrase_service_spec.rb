# frozen_string_literal: true

require "rails_helper"

RSpec.describe Generators::RephraseService do
  it "returns a rephrased prompt from ollama" do
    stub_ollama_chat(
      model: PRIMARY_MODEL,
      content: "Build an RSI indicator with configurable length defaulting to 14, plotted in a separate pane."
    )

    result = described_class.new(
      prompt: "rsi thing",
      script_type: "indicator",
      router: Llm::Router.new(adapter: build_ollama_adapter)
    ).call

    expect(result[:rephrased_prompt]).to include("RSI")
    expect(result[:model_used]).to eq(PRIMARY_MODEL)
  end

  it "raises when prompt is blank" do
    expect do
      described_class.new(prompt: "", script_type: "indicator").call
    end.to raise_error(ArgumentError, "prompt is required")
  end
end
