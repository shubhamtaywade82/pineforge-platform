# frozen_string_literal: true

require "rails_helper"

RSpec.describe Indicator, type: :model do
  subject(:indicator) { build(:indicator) }

  it { is_expected.to belong_to(:user).optional }
  it { is_expected.to have_many(:versions).class_name("IndicatorVersion").dependent(:destroy) }
  it { is_expected.to have_one(:generation_session).dependent(:destroy) }
  it { is_expected.to define_enum_for(:script_type).with_values(indicator: "indicator", strategy: "strategy", library: "library").backed_by_column_of_type(:string) }
  it { is_expected.to define_enum_for(:status).with_values(pending: "pending", streaming: "streaming", complete: "complete", failed: "failed").backed_by_column_of_type(:string) }
  it { is_expected.to validate_presence_of(:prompt) }
  it { is_expected.to validate_inclusion_of(:pine_version).in_array(%w[6]) }

  it "assigns a default name when blank on create" do
    indicator = build(:indicator, name: nil, script_type: :strategy)

    indicator.valid?

    expect(indicator.name).to eq("Untitled Strategy")
  end

  describe "#create_version!" do
    it "creates the first version" do
      indicator.save!

      expect {
        indicator.create_version!("//@version=6\nindicator(\"A\")")
      }.to change { indicator.versions.count }.by(1)

      expect(indicator.versions.first.version_number).to eq(1)
    end

    it "increments version numbers" do
      indicator.save!
      first = indicator.create_version!("//@version=6\nindicator(\"A\")")
      second = indicator.create_version!("//@version=6\nindicator(\"B\")", prompt_delta: "Add RSI filter")

      expect(first.version_number).to eq(1)
      expect(second.version_number).to eq(2)
      expect(second.prompt_delta).to eq("Add RSI filter")
    end
  end
end
