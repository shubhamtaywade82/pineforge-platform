# frozen_string_literal: true

require "rails_helper"

RSpec.describe Pine::Validator do
  subject(:result) { described_class.new(code).validate }

  context "with valid v6 indicator code" do
    let(:code) do
      <<~PINE
        //@version=6
        indicator("Test")
        plot(ta.rsi(close, 14))
      PINE
    end

    it "passes validation" do
      expect(result[:passed]).to be(true)
      expect(result[:errors]).to be_empty
    end
  end

  context "with deprecated study()" do
    let(:code) { "//@version=6\nstudy(\"Old\")\nplot(close)" }

    it "reports an error" do
      expect(result[:passed]).to be(false)
      expect(result[:errors].join).to include("study()")
    end
  end

  context "without version header" do
    let(:code) { 'indicator("Missing version")' }

    it "reports a missing version error" do
      expect(result[:passed]).to be(false)
      expect(result[:errors]).to include("Missing //@version=6 on first line")
    end
  end
end
