# frozen_string_literal: true

require "rails_helper"

RSpec.describe Generators::MetadataService, :vcr do
  it "extracts structured metadata from ollama", vcr: { cassette_name: "ollama/metadata_extraction", match_requests_on: %i[method uri] } do
    indicator = create(
      :indicator,
      metadata: {},
      prompt: "Build an RSI indicator with configurable length"
    )

    result = described_class.new(indicator: indicator, router: Llm::Router.new(adapter: build_ollama_adapter)).call

    expect(result["indicator_name"]).to eq("RSI Momentum")
    expect(indicator.reload.name).to eq("RSI Momentum")
    expect(indicator.metadata["overlay"]).to eq(true)
  end
end
