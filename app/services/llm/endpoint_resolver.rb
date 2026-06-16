# frozen_string_literal: true

require "net/http"
require "uri"

module Llm
  class EndpointResolver
    ResolvedEndpoint = Data.define(:client, :model, :source)

    HEALTH_OPEN_TIMEOUT = ENV.fetch("OLLAMA_HEALTH_OPEN_TIMEOUT", 2).to_i
    HEALTH_READ_TIMEOUT = ENV.fetch("OLLAMA_HEALTH_READ_TIMEOUT", 3).to_i

    class << self
      def resolve(preferred_model: PRIMARY_MODEL)
        if cloud_configured? && (working_key = first_working_key_or_unauthenticated)
          ResolvedEndpoint.new(
            client: build_cloud_client(working_key),
            model: preferred_model,
            source: "cloud"
          )
        else
          if cloud_configured?
            Rails.logger.warn("[Llm::EndpointResolver] Ollama Cloud unreachable or keys invalid — falling back to local")
          end

          ResolvedEndpoint.new(
            client: local_client,
            model: LOCAL_FALLBACK_MODEL,
            source: "local"
          )
        end
      end

      def reset_cache!
        @last_working_key = nil
      end

      private

      def cloud_configured?
        ENV["OLLAMA_CLOUD_URL"].present?
      end

      def cloud_api_keys
        keys = []
        keys << ENV["OLLAMA_API_KEY"] if ENV["OLLAMA_API_KEY"].present?
        keys << ENV["OLLAMA_API_KEY_ONE"] if ENV["OLLAMA_API_KEY_ONE"].present?
        keys << ENV["OLLAMA_API_KEY_TWO"] if ENV["OLLAMA_API_KEY_TWO"].present?
        keys << ENV["OLLAMA_API_KEY_THREE"] if ENV["OLLAMA_API_KEY_THREE"].present?

        if ENV["OLLAMA_CLOUD_API_KEYS"].present?
          keys.concat(ENV["OLLAMA_CLOUD_API_KEYS"].split(",").map(&:strip))
        end

        keys.uniq.reject(&:empty?)
      end

      def first_working_key_or_unauthenticated
        keys = cloud_api_keys

        if keys.empty?
          return "" if cloud_reachable?(nil)
          return nil
        end

        if @last_working_key && keys.include?(@last_working_key) && cloud_reachable?(@last_working_key)
          return @last_working_key
        end

        keys.each do |key|
          if cloud_reachable?(key)
            @last_working_key = key
            return key
          end
        end

        nil
      end

      def cloud_reachable?(api_key = nil)
        uri = URI.parse("#{ENV.fetch('OLLAMA_CLOUD_URL')}/api/tags")
        req = Net::HTTP::Get.new(uri.request_uri)
        req["Authorization"] = "Bearer #{api_key}" if api_key.present?

        use_ssl = uri.scheme == "https"

        Net::HTTP.start(uri.host, uri.port, use_ssl: use_ssl, open_timeout: HEALTH_OPEN_TIMEOUT, read_timeout: HEALTH_READ_TIMEOUT) do |http|
          response = http.request(req)
          response.is_a?(Net::HTTPSuccess)
        end
      rescue StandardError => e
        Rails.logger.debug("[Llm::EndpointResolver] Reachability check failed: #{e.message}")
        false
      end

      def build_cloud_client(api_key)
        config = Ollama::Config.new
        config.base_url = ENV.fetch("OLLAMA_CLOUD_URL")
        config.timeout = ENV.fetch("OLLAMA_TIMEOUT", 180).to_i
        config.model = ENV.fetch("OLLAMA_PRIMARY_MODEL", "qwen2.5-coder:7b")
        config.api_key = api_key if api_key.present?
        Ollama::Client.new(config: config)
      end

      def local_client
        Rails.application.config.x.ollama_local_client
      end
    end
  end
end
