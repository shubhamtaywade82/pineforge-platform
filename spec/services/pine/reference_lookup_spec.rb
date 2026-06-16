# frozen_string_literal: true

require "rails_helper"

RSpec.describe Pine::ReferenceLookup do
  after { described_class.reset_index! }

  describe ".call" do
    it "returns reference text for explicit symbols" do
      result = described_class.call(prompt: "Build ta.rsi with ta.ema filter", script_type: "indicator")

      expect(result).to include("PINE v6 SYMBOL REFERENCE")
      expect(result).to include("ta.rsi()")
      expect(result).to include("ta.ema()")
    end

    it "resolves keyword aliases" do
      result = described_class.call(prompt: "RSI momentum with ATR stop", script_type: "indicator")

      expect(result).to include("ta.rsi()")
      expect(result).to include("ta.atr()")
    end

    it "returns empty string when index is missing" do
      allow(described_class).to receive(:enabled?).and_return(false)

      expect(described_class.call(prompt: "ta.rsi", script_type: "indicator")).to eq("")
    end
  end
end
