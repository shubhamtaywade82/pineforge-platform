# frozen_string_literal: true

FactoryBot.define do
  factory :indicator do
    user
    name { Faker::Finance.unique.ticker }
    prompt do
      Faker::Lorem.sentence(word_count: 8,
                            supplemental: "Build a Pine Script v6 #{script_type} with #{Faker::Hacker.adjective} signals")
    end
    script_type { :indicator }
    status { :pending }
    pine_version { "6" }
    generated_code do
      <<~PINE
        //@version=6
        indicator("#{name}", overlay=true)
        plot(ta.rsi(close, 14))
      PINE
    end
    metadata { {} }
    validation { { "passed" => true, "errors" => [], "warnings" => [] } }

    trait :strategy do
      script_type { :strategy }
      generated_code do
        <<~PINE
          //@version=6
          strategy("#{name}", overlay=true)
          if ta.crossover(ta.sma(close, 9), ta.sma(close, 21))
              strategy.entry("Long", strategy.long)
        PINE
      end
    end

    trait :library do
      script_type { :library }
      generated_code do
        <<~PINE
          //@version=6
          library("#{name}", overlay=false)
          export foo() => close
        PINE
      end
    end

    trait :streaming do
      status { :streaming }
      generated_code { nil }
    end

    trait :complete do
      status { :complete }
    end

    trait :failed do
      status { :failed }
      validation { { "passed" => false, "errors" => ["Missing //@version=6 on first line"], "warnings" => [] } }
    end

    trait :without_user do
      user { nil }
    end

    trait :with_metadata do
      metadata do
        {
          "overlay" => true,
          "inputs_detected" => ["length"],
          "description" => Faker::Lorem.sentence,
          "indicator_name" => name
        }
      end
    end

    trait :with_versions do
      after(:create) do |indicator|
        create(:indicator_version, indicator: indicator, version_number: 1, code: indicator.generated_code)
      end
    end
  end
end
