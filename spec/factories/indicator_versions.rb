# frozen_string_literal: true

FactoryBot.define do
  factory :indicator_version do
    indicator
    version_number { indicator.versions.count + 1 }
    code { indicator.generated_code || "//@version=6\nindicator(\"Version\")\nplot(close)" }
    prompt_delta { Faker::Lorem.sentence(word_count: 6) }
    metadata { {} }
  end
end
