# frozen_string_literal: true

require "rails_helper"

RSpec.describe Indicator, type: :model do
  subject(:indicator) { build(:indicator) }

  it { is_expected.to validate_presence_of(:prompt) }
  it { is_expected.to validate_inclusion_of(:pine_version).in_array(%w[6]) }

  describe "#create_version!" do
    it "increments version numbers" do
      indicator.save!
      first = indicator.create_version!("//@version=6\nindicator(\"A\")")
      second = indicator.create_version!("//@version=6\nindicator(\"B\")")

      expect(first.version_number).to eq(1)
      expect(second.version_number).to eq(2)
    end
  end
end
