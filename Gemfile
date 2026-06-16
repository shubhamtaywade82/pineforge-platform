# frozen_string_literal: true

source "https://rubygems.org"

gem "rails", "~> 8.1.3"
gem "pg", "~> 1.1"
gem "puma", ">= 5.0"

gem "tzinfo-data", platforms: %i[windows jruby]

gem "solid_cache"
gem "solid_cable"

gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false

gem "rack-cors"
gem "redis"
gem "sidekiq"
gem "ollama-client", "~> 1.3"
gem "diff-lcs"

group :development, :test do
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "bundler-audit", require: false
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
  gem "rspec-rails", "~> 7.1"
  gem "factory_bot_rails"
  gem "faker"
  gem "webmock"
end

group :test do
  gem "shoulda-matchers", "~> 6.0"
  gem "vcr", "~> 6.3"
  gem "json_matchers"
  gem "rspec-sidekiq"
  gem "simplecov", require: false
end
