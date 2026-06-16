# frozen_string_literal: true

FactoryBot.define do
  factory :generation_session do
    indicator
    user { indicator.user }
    messages { [] }

    trait :with_history do
      messages do
        [
          { "role" => "user", "content" => indicator.prompt },
          { "role" => "assistant", "content" => indicator.generated_code }
        ]
      end
    end
  end
end
