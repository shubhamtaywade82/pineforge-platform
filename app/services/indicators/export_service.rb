# frozen_string_literal: true

module Indicators
  class ExportService
    def initialize(indicator:)
      @indicator = indicator
    end

    def call
      {
        filename: "#{sanitized_name}.pine",
        content_type: "text/plain",
        body: @indicator.generated_code.to_s
      }
    end

    private

    def sanitized_name
      @indicator.name.parameterize(separator: "_")
    end
  end
end
