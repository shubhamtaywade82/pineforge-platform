# frozen_string_literal: true

require "rails_helper"

RSpec.describe Llm::Router do
  let(:adapter) { instance_double(Llm::OllamaAdapter) }
  let(:router) { described_class.new(adapter: adapter, logger: Logger.new(nil)) }

  it "falls back to the secondary model when the primary fails" do
    allow(adapter).to receive(:chat)
      .with(hash_including(model: PRIMARY_MODEL))
      .and_raise(Ollama::Error, "primary down")
    allow(adapter).to receive(:chat)
      .with(hash_including(model: FALLBACK_MODEL))
      .and_return("ok")

    result = router.chat(messages: [{ role: "user", content: "hi" }], stream: false)

    expect(result).to eq("ok")
    expect(router.last_model_used).to eq(FALLBACK_MODEL)
  end
end
