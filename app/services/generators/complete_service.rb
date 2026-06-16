# frozen_string_literal: true

module Generators
  class CompleteService
    MAX_PREFIX_LENGTH = 4_096

    def initialize(prefix:, script_type: "indicator", router: Llm::Router.new)
      @prefix = prefix.to_s
      @script_type = script_type
      @router = router
    end

    def call
      raise ArgumentError, "prefix is required" if @prefix.blank?

      truncated_prefix = @prefix.last(MAX_PREFIX_LENGTH)
      builder = Prompts::Builder.new(prompt: truncated_prefix, script_type: @script_type)

      completion = @router.chat(messages: builder.completion_messages, stream: false).to_s.strip

      {
        completion: completion,
        model_used: @router.last_model_used
      }
    end
  end
end
