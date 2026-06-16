# frozen_string_literal: true

module RequestHelpers
  def json_headers
    { "CONTENT_TYPE" => "application/json", "ACCEPT" => "application/json" }
  end

  def json_response
    response.parsed_body
  end
end

RSpec.configure do |config|
  config.include RequestHelpers, type: :request
end
