# frozen_string_literal: true

require "json_matchers/rspec"

JsonMatchers.schema_root = "spec/support/schemas"

RSpec.configure do |config|
  config.include JsonMatchers::Helpers
end
