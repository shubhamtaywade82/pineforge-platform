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

  context "when source is cloud" do
    let(:cloud_adapter) { build_ollama_adapter }
    let(:local_client) { instance_double(Ollama::Client) }
    let(:router) { described_class.new(adapter: cloud_adapter, primary_model: PRIMARY_MODEL, source: "cloud", logger: Logger.new(nil)) }

    before do
      allow(Rails.application.config.x).to receive(:ollama_local_client).and_return(local_client)
      stub_ollama_chat_failure(model: PRIMARY_MODEL)
    end

    it "falls back to local client and local fallback model if cloud primary model call fails" do
      allow(local_client).to receive(:list_model_names).and_return([LOCAL_FALLBACK_MODEL])
      # Stub local client chat call
      local_adapter = instance_double(Llm::OllamaAdapter)
      allow(Llm::OllamaAdapter).to receive(:new).and_call_original
      allow(Llm::OllamaAdapter).to receive(:new).with(client: local_client).and_return(local_adapter)
      allow(local_adapter).to receive(:chat).with(
        messages: [{ role: "user", content: "hi" }],
        model: LOCAL_FALLBACK_MODEL,
        stream: false,
        format: nil
      ).and_return("local response")

      result = router.chat(messages: [{ role: "user", content: "hi" }], stream: false)

      expect(result).to eq("local response")
      expect(router.last_model_used).to eq(LOCAL_FALLBACK_MODEL)
      expect(router.last_source).to eq("local")
    end

    it "resolves to the best alternative model if local fallback model is not installed locally" do
      allow(local_client).to receive(:list_model_names).and_return(["llama3.2:latest", "other-model"])
      local_adapter = instance_double(Llm::OllamaAdapter)
      allow(Llm::OllamaAdapter).to receive(:new).and_call_original
      allow(Llm::OllamaAdapter).to receive(:new).with(client: local_client).and_return(local_adapter)
      allow(local_adapter).to receive(:chat).with(
        messages: [{ role: "user", content: "hi" }],
        model: "llama3.2:latest",
        stream: false,
        format: nil
      ).and_return("alternative local response")

      result = router.chat(messages: [{ role: "user", content: "hi" }], stream: false)

      expect(result).to eq("alternative local response")
      expect(router.last_model_used).to eq("llama3.2:latest")
      expect(router.last_source).to eq("local")
    end
  end
end
