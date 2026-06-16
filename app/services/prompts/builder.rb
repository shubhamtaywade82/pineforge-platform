# frozen_string_literal: true

module Prompts
  class Builder
    PROMPT_VERSION = "v1"

    def initialize(prompt:, script_type:, context_messages: [])
      @prompt = prompt
      @script_type = script_type.to_s
      @context_messages = context_messages
    end

    def system_prompt
      base = File.read(Rails.root.join("app/prompts/#{PROMPT_VERSION}/minimal_system.txt"))
      append_graph_context(base)
    end

    def messages
      base = [{ role: "system", content: system_prompt }]
      base.concat(normalized_context)
      base << { role: "user", content: @prompt }
      base
    end

    def repair_messages(errors:)
      [
        { role: "system", content: system_prompt },
        { role: "user", content: @prompt },
        { role: "assistant", content: @existing_code.to_s },
        {
          role: "user",
          content: "Fix the Pine Script v6 code. Validation errors:\n#{errors.join("\n")}"
        }
      ]
    end

    def structured_extraction_prompt
      <<~PROMPT
        Given this Pine Script v6 request, extract metadata as JSON only.
        No markdown, no explanation.
        Schema: {
          "indicator_name": "string",
          "overlay": true|false,
          "inputs_detected": ["array of input variable names"],
          "description": "one sentence summary"
        }
        Request: #{@prompt}
      PROMPT
    end

    def completion_messages
      [
        { role: "system", content: completion_system_prompt },
        { role: "user", content: "Complete this Pine Script v6 code from the cursor:\n\n#{@prompt}" }
      ]
    end

    def completion_system_prompt
      base = File.read(Rails.root.join("app/prompts/#{PROMPT_VERSION}/completion_system.txt"))
      append_graph_context(base)
    end

    attr_writer :existing_code

    private

    def append_graph_context(base)
      context = Graphify::ContextService.fetch(@prompt, @script_type)
      return base if context.blank?

      <<~PROMPT.strip
        #{base}

        === RELEVANT PINE v6 GRAPH CONTEXT (#{@script_type}) ===
        #{context}
      PROMPT
    end

    def normalized_context
      @context_messages.map do |message|
        message.stringify_keys.slice("role", "content")
      end
    end
  end
end
