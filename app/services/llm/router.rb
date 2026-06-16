# frozen_string_literal: true

module Llm
  class Router
    attr_reader :last_model_used, :last_generation_ms

    def initialize(adapter: OllamaAdapter.new, logger: Rails.logger)
      @adapter = adapter
      @logger = logger
      @last_model_used = nil
      @last_generation_ms = 0
    end

    def chat(messages:, stream: false, format: nil, &block)
      models = [PRIMARY_MODEL, FALLBACK_MODEL].uniq
      last_error = nil

      models.each_with_index do |model, index|
        started_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
        result = @adapter.chat(messages: messages, model: model, stream: stream, format: format, &block)
        @last_generation_ms = ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - started_at) * 1000).round
        @last_model_used = model
        @logger.info("[Llm::Router] model=#{model} elapsed_ms=#{@last_generation_ms}")
        return result
      rescue Ollama::Error => e
        last_error = e
        @logger.warn("[Llm::Router] model=#{model} failed: #{e.message}")
        raise if index == models.length - 1
      end

      raise last_error if last_error
    end
  end
end
