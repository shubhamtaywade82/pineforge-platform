# frozen_string_literal: true

require "ollama-client"

ollama_config = Ollama::Config.new
ollama_config.base_url = if Rails.env.test?
  ENV.fetch("OLLAMA_CLOUD_URL", ENV.fetch("OLLAMA_URL", "http://ollama.test"))
else
  ENV.fetch("OLLAMA_CLOUD_URL", ENV.fetch("OLLAMA_URL", "http://localhost:11434"))
end
ollama_config.timeout = ENV.fetch("OLLAMA_TIMEOUT", 180).to_i
ollama_config.model = ENV.fetch("OLLAMA_PRIMARY_MODEL", "qwen2.5-coder:7b")

Rails.application.config.x.ollama_client = Ollama::Client.new(config: ollama_config)

PRIMARY_MODEL  = ENV.fetch("OLLAMA_PRIMARY_MODEL", "qwen2.5-coder:7b")
FALLBACK_MODEL = ENV.fetch("OLLAMA_FALLBACK_MODEL", "deepseek-r1:7b")
