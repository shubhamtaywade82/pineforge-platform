# frozen_string_literal: true

require "rails_helper"

RSpec.describe Llm::Router do
  let(:router) { described_class.new(adapter: build_ollama_adapter, logger: Logger.new(nil)) }

  it "falls back to the secondary model when the primary fails" do
    stub_ollama_chat_failure(model: PRIMARY_MODEL)
    stub_ollama_chat(model: FALLBACK_MODEL, content: "fallback ok")

    result = router.chat(messages: [{ role: "user", content: "hi" }], stream: false)

    expect(result).to eq("fallback ok")
    expect(router.last_model_used).to eq(FALLBACK_MODEL)
  end
end
