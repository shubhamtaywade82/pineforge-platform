# frozen_string_literal: true

require "rails_helper"

RSpec.describe IndicatorVersionCreator do
  let(:indicator) { create(:indicator) }

  it "creates the first version" do
    expect {
      described_class.call(indicator: indicator, code: "abc")
    }.to change { indicator.versions.count }.by(1)

    expect(indicator.versions.first.version_number).to eq(1)
  end

  it "increments versions" do
    described_class.call(indicator: indicator, code: "v1")
    second = described_class.call(indicator: indicator, code: "v2", prompt_delta: "Add RSI filter")

    expect(second.version_number).to eq(2)
    expect(second.prompt_delta).to eq("Add RSI filter")
  end
end
