# frozen_string_literal: true

module Generators
  class RefineService
    def initialize(
      indicator:,
      prompt:,
      user: nil,
      router: nil,
      repair_service: nil,
      &event_emitter
    )
      @indicator = indicator
      @prompt = prompt
      @user = user
      @endpoint = Llm::EndpointResolver.resolve
      @router = router || Llm::Router.from_resolved_endpoint(@endpoint)
      @repair_service = repair_service || RepairService.new(router: @router)
      @emit = event_emitter
    end

    def call
      session = @indicator.generation_session || @indicator.create_generation_session!(user: @user, messages: [])
      prior_messages = Array(session.messages)
      prior_messages << { role: "user", content: @prompt }

      emit(type: "init", indicator_id: @indicator.id, model: @endpoint.model, source: @endpoint.source)

      builder = Prompts::Builder.new(
        prompt: @prompt,
        script_type: @indicator.script_type,
        context_messages: session.messages
      )

      @indicator.update!(status: :streaming)
      full_code = generate_code(builder.messages)
      validation, full_code = @repair_service.call(
        builder: builder,
        initial_code: full_code,
        prompt: @prompt,
        emit: method(:emit)
      )

      version = @indicator.create_version!(full_code, prompt_delta: @prompt)
      @indicator.update!(
        generated_code: full_code,
        status: validation[:passed] ? :complete : :failed,
        validation: validation,
        metadata: @indicator.metadata.merge(
          generation_ms: @router.last_generation_ms,
          token_count: full_code.length
        )
      )

      session.update!(
        messages: prior_messages + [{ role: "assistant", content: full_code }]
      )

      emit(type: "done", version: version.version_number, validation: validation)
      @indicator
    end

    private

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
