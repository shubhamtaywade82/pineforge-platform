# frozen_string_literal: true

# Record new cassettes against a live Ollama instance:
#   VCR_RECORD=all bundle exec rspec spec/services/generators/metadata_service_spec.rb
#
# Default mode replays existing cassettes and blocks real HTTP via WebMock.
