# frozen_string_literal: true

require "ollama-client"

OllamaClient = Ollama::Client.new(
  config: Ollama::Config.new(
    base_url: ENV.fetch("OLLAMA_CLOUD_URL", ENV.fetch("OLLAMA_URL", "http://localhost:11434")),
    timeout: ENV.fetch("OLLAMA_TIMEOUT", 180).to_i,
    model: ENV.fetch("OLLAMA_PRIMARY_MODEL", "qwen2.5-coder:7b")
  )
)

PRIMARY_MODEL  = ENV.fetch("OLLAMA_PRIMARY_MODEL", "qwen2.5-coder:7b")
FALLBACK_MODEL = ENV.fetch("OLLAMA_FALLBACK_MODEL", "deepseek-r1:7b")
