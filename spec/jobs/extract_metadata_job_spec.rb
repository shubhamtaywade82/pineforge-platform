# frozen_string_literal: true

require "rails_helper"

RSpec.describe ExtractMetadataJob, type: :job do
  it "updates indicator metadata via the metadata service" do
    indicator = create(:indicator, metadata: {}, name: "Old Name")
    stub_ollama_chat(
      model: PRIMARY_MODEL,
      content: {
        indicator_name: "RSI Pro",
        overlay: true,
        inputs_detected: ["length"],
        description: "RSI momentum indicator"
      }.to_json
    )

    described_class.perform_now(indicator.id)

    indicator.reload
    expect(indicator.name).to eq("RSI Pro")
    expect(indicator.metadata["overlay"]).to eq(true)
    expect(indicator.metadata["inputs_detected"]).to eq(["length"])
  end
end
