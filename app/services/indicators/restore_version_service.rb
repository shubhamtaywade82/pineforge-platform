# frozen_string_literal: true

module Indicators
  class RestoreVersionService
    def initialize(indicator:, version_number:)
      @indicator = indicator
      @version_number = version_number
    end

    def call
      version = @indicator.versions.find_by!(version_number: @version_number)
      @indicator.update!(generated_code: version.code)
      @indicator
    end
  end
end
