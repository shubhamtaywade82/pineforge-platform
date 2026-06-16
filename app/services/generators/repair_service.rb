# frozen_string_literal: true

module Generators
  class RepairService
    MAX_ATTEMPTS = 2

    def initialize(router: Llm::Router.new, validator: Pine::Validator)
      @router = router
      @validator_class = validator
    end

    def call(builder:, initial_code:, prompt:, emit:)
      code = initial_code
      validation = validate(code)

      MAX_ATTEMPTS.times do |attempt|
        break if validation[:passed]

        emit.call(type: "repair_attempt", attempt: attempt + 1, errors: validation[:errors])
        builder.existing_code = code
        repair_messages = builder.repair_messages(errors: validation[:errors])
        code = +""
        @router.chat(messages: repair_messages, stream: true) do |token|
          code << token
          emit.call(type: "token", token: token)
        end
        validation = validate(code)
      end

      [validation, code]
    end

    private

    def validate(code)
      @validator_class.new(code).validate
    end
  end
end
