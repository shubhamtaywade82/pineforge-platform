# frozen_string_literal: true

require "rails_helper"

RSpec.describe Llm::OllamaAdapter do
  describe "#chat" do
    it "returns assistant content for non-streaming responses" do
      stub_ollama_chat(model: PRIMARY_MODEL, content: "//@version=6\nindicator(\"Test\")")

      result = build_ollama_adapter.chat(
        messages: [{ role: "user", content: "Build RSI" }],
        model: PRIMARY_MODEL,
        stream: false
      )

      expect(result).to include("//@version=6")
    end

    it "yields streamed tokens" do
      stub_ollama_chat(
        model: PRIMARY_MODEL,
        content: "//@version=6\nindicator(\"Stream\")",
        stream: true
      )

      tokens = []
      build_ollama_adapter.chat(
        messages: [{ role: "user", content: "Build RSI" }],
        model: PRIMARY_MODEL,
        stream: true
      ) { |token| tokens << token }

      expect(tokens.join).to include("//@version=6")
    end
  end
end
