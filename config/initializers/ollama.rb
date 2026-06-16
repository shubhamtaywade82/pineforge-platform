# frozen_string_literal: true

require "ollama-client"

def build_ollama_client(base_url)
  config = Ollama::Config.new
  config.base_url = base_url
  config.timeout = ENV.fetch("OLLAMA_TIMEOUT", 180).to_i
  config.model = ENV.fetch("OLLAMA_PRIMARY_MODEL", "qwen2.5-coder:7b")
  Ollama::Client.new(config: config)
end

cloud_url = ENV["OLLAMA_CLOUD_URL"].presence
local_url = if Rails.env.test?
  ENV.fetch("OLLAMA_URL", "http://ollama.test")
else
  ENV.fetch("OLLAMA_URL", "http://localhost:11434")
end

Rails.application.config.x.ollama_cloud_client = cloud_url ? build_ollama_client(cloud_url) : nil
Rails.application.config.x.ollama_local_client = build_ollama_client(local_url)

default_client = if Rails.env.test?
  build_ollama_client(ENV.fetch("OLLAMA_CLOUD_URL", ENV.fetch("OLLAMA_URL", "http://ollama.test")))
else
  Rails.application.config.x.ollama_cloud_client || Rails.application.config.x.ollama_local_client
end

Rails.application.config.x.ollama_client = default_client

PRIMARY_MODEL = ENV.fetch("OLLAMA_PRIMARY_MODEL", "qwen2.5-coder:7b")
FALLBACK_MODEL = ENV.fetch("OLLAMA_FALLBACK_MODEL", "deepseek-r1:7b")
LOCAL_FALLBACK_MODEL = ENV.fetch("OLLAMA_LOCAL_FALLBACK_MODEL", "qwen2.5-coder:3b")
