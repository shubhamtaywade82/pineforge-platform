# frozen_string_literal: true

module Generators
  class RephraseService
    MAX_PROMPT_LENGTH = 4_096

    def initialize(prompt:, script_type: "indicator", router: nil)
      @prompt = prompt.to_s
      @script_type = script_type
      @router = router || Llm::Router.from_resolved_endpoint(Llm::EndpointResolver.resolve)
    end

    def call
      raise ArgumentError, "prompt is required" if @prompt.blank?

      truncated_prompt = @prompt.strip.first(MAX_PROMPT_LENGTH)
      builder = Prompts::Builder.new(prompt: truncated_prompt, script_type: @script_type)
      rephrased = @router.chat(messages: builder.rephrase_messages, stream: false).to_s.strip
      rephrased = strip_wrappers(rephrased)

      {
        rephrased_prompt: rephrased,
        model_used: @router.last_model_used
      }
    end

    private

    def strip_wrappers(text)
      text.gsub(/\A```\w*\s*/, "").gsub(/\s*```\z/, "").strip
    end
  end
end
