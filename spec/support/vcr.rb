# frozen_string_literal: true

require "vcr"

VCR.configure do |config|
  config.cassette_library_dir = "spec/cassettes"
  config.hook_into :webmock
  config.configure_rspec_metadata!

  config.filter_sensitive_data("<OLLAMA_API_KEY>") do |interaction|
    auth = interaction.request.headers["Authorization"]&.first
    auth&.sub(/\ABearer /, "")
  end

  config.ignore_localhost = false

  config.default_cassette_options = {
    record: ENV.fetch("VCR_RECORD", :once).to_sym,
    match_requests_on: %i[method uri body],
    allow_playback_repeats: true
  }
end
