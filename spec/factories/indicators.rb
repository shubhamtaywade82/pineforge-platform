# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "developer#{n}@pineforge.dev" }
  end

  factory :indicator do
    association :user
    name { "RSI Momentum" }
    prompt { "Build an RSI indicator with overbought and oversold levels" }
    script_type { :indicator }
    status { :pending }
    pine_version { "6" }
    generated_code { "//@version=6\nindicator(\"RSI\")\nplot(ta.rsi(close, 14))" }
    metadata { {} }
    validation { { "passed" => true, "errors" => [], "warnings" => [] } }
  end

  factory :indicator_version do
    association :indicator
    sequence(:version_number) { |n| n }
    code { indicator.generated_code }
    metadata { {} }
  end

  factory :generation_session do
    association :indicator
    association :user
    messages { [] }
  end
end
