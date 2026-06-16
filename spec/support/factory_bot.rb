# frozen_string_literal: true

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods

  config.before(:suite) do
    FactoryBot.lint(traits: true) if ENV["FACTORY_BOT_LINT"] == "true"
  end
end
