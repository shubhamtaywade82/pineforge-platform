# frozen_string_literal: true

module Generators
  class StreamService
    def initialize(
      prompt:,
      script_type:,
      name: nil,
      user: nil,
      router: nil,
      repair_service: nil,
      &event_emitter
    )
      @prompt = prompt
      @script_type = script_type
      @name = name
      @user = user
      @endpoint = Llm::EndpointResolver.resolve
      @router = router || Llm::Router.from_resolved_endpoint(@endpoint)
      @repair_service = repair_service || RepairService.new(router: @router)
      @emit = event_emitter
    end

    def call
      indicator = create_indicator!
      emit(type: "init", indicator_id: indicator.id, model: @endpoint.model, source: @endpoint.source)

      builder = Prompts::Builder.new(prompt: @prompt, script_type: @script_type)
      full_code = generate_code(builder.messages)
      validation, full_code = @repair_service.call(
        builder: builder,
        initial_code: full_code,
        prompt: @prompt,
        emit: method(:emit)
      )

      indicator.update!(
        generated_code: full_code,
        status: validation[:passed] ? :complete : :failed,
        model_used: @router.last_model_used,
        metadata: indicator.metadata.merge(
          generation_ms: @router.last_generation_ms,
          token_count: full_code.length
        ),
        validation: validation
      )
      version = indicator.create_version!(full_code)
      ExtractMetadataJob.perform_later(indicator.id)

      emit(
        type: "done",
        indicator_id: indicator.id,
        version: version.version_number,
        validation: validation
      )

      indicator
    rescue Ollama::Error => e
      indicator&.update!(status: :failed)
      emit(type: "error", message: e.message)
      raise
    end

    private

    def create_indicator!
      Indicator.create!(
        user: @user,
        name: @name.presence || "Generating...",
        prompt: @prompt,
        script_type: @script_type,
        status: :streaming
      )
    end

    def generate_code(messages)
      code = +""
      @router.chat(messages: messages, stream: true) do |token|
        code << token
        emit(type: "token", token: token)
      end
      code
    end

    def emit(payload)
      @emit.call(payload)
    end
  end
end
