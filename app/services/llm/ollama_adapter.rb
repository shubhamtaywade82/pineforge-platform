# frozen_string_literal: true

module Llm
  class OllamaAdapter
    def initialize(client: OllamaClient)
      @client = client
    end

    def chat(messages:, model:, stream: false, format: nil, &block)
      hooks = {}
      if stream && block
        hooks[:on_token] = ->(text, _logprobs = nil) { block.call(text) }
      end

      response = @client.chat(
        messages: messages,
        model: model,
        stream: stream,
        format: format,
        hooks: hooks
      )

      stream ? response : response.message&.content.to_s
    end

    def embed(text:, model: "nomic-embed-text")
      @client.embeddings.embed(model: model, input: text)
    end
  end
end
