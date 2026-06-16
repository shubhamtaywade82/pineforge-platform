# frozen_string_literal: true

require "rails_helper"

RSpec.describe Generators::CompleteService do
  it "returns a completion from ollama" do
    stub_ollama_chat(model: PRIMARY_MODEL, content: "plot(ta.rsi(close, 14))")

    result = described_class.new(
      prefix: "//@version=6\nindicator(\"RSI\")\n",
      script_type: "indicator",
      router: Llm::Router.new(adapter: build_ollama_adapter)
    ).call

    expect(result[:completion]).to include("plot")
    expect(result[:model_used]).to eq(PRIMARY_MODEL)
  end

  it "raises when prefix is blank" do
    expect do
      described_class.new(prefix: "", script_type: "indicator").call
    end.to raise_error(ArgumentError, "prefix is required")
  end
end
