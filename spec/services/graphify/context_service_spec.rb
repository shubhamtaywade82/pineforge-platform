# frozen_string_literal: true

require "rails_helper"

RSpec.describe Graphify::ContextService do
  describe ".enabled?" do
    it "returns true when graph.json exists" do
      allow(described_class::GRAPH_PATH).to receive(:exist?).and_return(true)
      expect(described_class.enabled?).to be(true)
    end
  end

  describe ".fetch" do
    it "returns empty string when graph is missing" do
      allow(described_class::GRAPH_PATH).to receive(:exist?).and_return(false)
      expect(described_class.fetch("rsi indicator", "indicator")).to eq("")
    end

    it "returns graph query output on success" do
      allow(described_class::GRAPH_PATH).to receive(:exist?).and_return(true)
      allow(Open3).to receive(:capture3).and_return(["ta.rsi context", "", instance_double(Process::Status, success?: true)])

      result = described_class.fetch('plot "close"', "indicator")
      expect(result).to eq("ta.rsi context")
    end

    it "returns empty string when graphify fails" do
      allow(described_class::GRAPH_PATH).to receive(:exist?).and_return(true)
      allow(Open3).to receive(:capture3).and_return(["", "error", instance_double(Process::Status, success?: false, exitstatus: 1)])

      expect(described_class.fetch("rsi", "indicator")).to eq("")
    end
  end

  describe "sanitization" do
    it "strips shell-sensitive characters from queries" do
      allow(described_class::GRAPH_PATH).to receive(:exist?).and_return(true)
      expect(Open3).to receive(:capture3).with(
        "graphify",
        "query",
        satisfy { |query| !query.include?('"') && !query.include?("`") && !query.include?("$") },
        "--graph",
        described_class::GRAPH_PATH.to_s,
        "--budget",
        "2000"
      ).and_return(["ok", "", instance_double(Process::Status, success?: true)])

      described_class.fetch('bad"$(cmd)', "indicator")
    end
  end
end
