# frozen_string_literal: true

module OllamaHelpers
  OLLAMA_TEST_HOST = "http://ollama.test"

  def ollama_base_url
    OLLAMA_TEST_HOST
  end

  def build_ollama_client
    config = Ollama::Config.new
    config.base_url = ollama_base_url
    config.timeout = 5
    config.model = PRIMARY_MODEL
    Ollama::Client.new(config: config)
  end

  def build_ollama_adapter
    Llm::OllamaAdapter.new(client: build_ollama_client)
  end

  def request_model(request)
    JSON.parse(request.body)["model"]
  end

  def stub_ollama_chat(model:, content:, stream: false, status: 200)
    if stream
      chunks = content.chars.each_slice(8).map(&:join).map do |chunk|
        { message: { content: chunk }, done: false }.to_json
      end
      chunks << { message: { content: "" }, done: true }.to_json
      response_body = chunks.join("\n")

      stub_request(:post, "#{ollama_base_url}/api/chat")
        .with { |request| request_model(request) == model }
        .to_return(status: status, body: response_body, headers: { "Content-Type" => "application/json" })
    else
      stub_request(:post, "#{ollama_base_url}/api/chat")
        .with { |request| request_model(request) == model }
        .to_return(
          status: status,
          body: { message: { role: "assistant", content: content }, done: true }.to_json,
          headers: { "Content-Type" => "application/json" }
        )
    end
  end

  def stub_ollama_chat_failure(model:, status: 500, message: "model unavailable")
    stub_request(:post, "#{ollama_base_url}/api/chat")
      .with { |request| request_model(request) == model }
      .to_return(status: status, body: { error: message }.to_json)
  end
end

RSpec.configure do |config|
  config.include OllamaHelpers

  config.before do
    allow(Rails.application.config.x).to receive(:ollama_client).and_return(build_ollama_client)
    allow(Rails.application.config.x).to receive(:ollama_local_client).and_return(build_ollama_client)
    allow(Graphify::ContextService).to receive(:fetch).and_return("")

    endpoint = Llm::EndpointResolver::ResolvedEndpoint.new(
      client: build_ollama_client,
      model: PRIMARY_MODEL,
      source: "local"
    )
    allow(Llm::EndpointResolver).to receive(:resolve).and_return(endpoint)
    Llm::EndpointResolver.reset_cache! if Llm::EndpointResolver.respond_to?(:reset_cache!)
  end
end
