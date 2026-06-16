# frozen_string_literal: true

module Llm
  class Router
    attr_reader :last_model_used, :last_generation_ms, :last_source

    def initialize(adapter: OllamaAdapter.new, primary_model: PRIMARY_MODEL, source: nil, logger: Rails.logger)
      @adapter = adapter
      @primary_model = primary_model
      @last_source = source
      @logger = logger
      @last_model_used = nil
      @last_generation_ms = 0
    end

    def self.from_resolved_endpoint(endpoint)
      new(
        adapter: OllamaAdapter.new(client: endpoint.client),
        primary_model: endpoint.model,
        source: endpoint.source
      )
    end

    def chat(messages:, stream: false, format: nil, &block)
      models = [@primary_model, FALLBACK_MODEL].uniq
      last_error = nil

      models.each_with_index do |model, index|
        started_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
        result = @adapter.chat(messages: messages, model: model, stream: stream, format: format, &block)
        @last_generation_ms = ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - started_at) * 1000).round
        @last_model_used = model
        @logger.info("[Llm::Router] model=#{model} source=#{@last_source} elapsed_ms=#{@last_generation_ms}")
        return result
      rescue Ollama::Error => e
        last_error = e
        @logger.warn("[Llm::Router] model=#{model} failed: #{e.message}")
        
        # If the failure occurred on a cloud endpoint, attempt an immediate fallback to local Ollama
        if @last_source == "cloud"
          @logger.warn("[Llm::Router] Cloud call failed — attempting local fallback...")
          local_client = Rails.application.config.x.ollama_local_client
          if local_client
            local_adapter = OllamaAdapter.new(client: local_client)
            begin
              local_started_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
              
              # Query local models to pick one that is actually downloaded/present
              local_models = local_client.list_model_names rescue []
              best_model = LOCAL_FALLBACK_MODEL
              
              unless local_models.include?(best_model)
                preferred_fallbacks = [
                  "qwen2.5-coder:7b", "qwen2.5-coder:3b", "qwen2.5:0.5b",
                  "qwen3.5:latest", "llama3.2:latest", "llama3.2:3b",
                  "qwen3.5:4b", "qwen3:8b", "qwen3:latest", "llama3.1:8b"
                ]
                matched_model = preferred_fallbacks.find { |m| local_models.include?(m) }
                best_model = matched_model || local_models.reject { |m| m.include?("embed") }.first || best_model
              end

              @logger.warn("[Llm::Router] Selected best available local model: #{best_model}")

              local_result = local_adapter.chat(
                messages: messages,
                model: best_model,
                stream: stream,
                format: format,
                &block
              )
              @last_generation_ms = ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - local_started_at) * 1000).round
              @last_model_used = best_model
              @last_source = "local"
              @adapter = local_adapter
              @logger.info("[Llm::Router] Local fallback successful: model=#{best_model} elapsed_ms=#{@last_generation_ms}")
              return local_result
            rescue Ollama::Error => local_err
              @logger.error("[Llm::Router] Local fallback also failed: #{local_err.message}")
            end
          end
        end

        raise if index == models.length - 1
      end

      raise last_error if last_error
    end
  end
end
