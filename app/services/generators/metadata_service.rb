# frozen_string_literal: true

module Generators
  class MetadataService
    def initialize(indicator:, router: nil)
      @indicator = indicator
      @router = router || Llm::Router.from_resolved_endpoint(Llm::EndpointResolver.resolve)
    end

    def call
      builder = Prompts::Builder.new(
        prompt: @indicator.prompt,
        script_type: @indicator.script_type
      )

      result = @router.chat(
        messages: [
          { role: "system", content: "You extract Pine Script metadata. Return JSON only." },
          { role: "user", content: builder.structured_extraction_prompt }
        ],
        format: "json"
      )

      payload = JSON.parse(result)
      @indicator.update!(
        name: payload["indicator_name"].presence || @indicator.name,
        metadata: @indicator.metadata.merge(
          "overlay" => payload["overlay"],
          "inputs_detected" => payload["inputs_detected"],
          "description" => payload["description"]
        )
      )
      payload
    end
  end
end
