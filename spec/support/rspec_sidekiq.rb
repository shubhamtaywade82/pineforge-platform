# frozen_string_literal: true

require "rspec-sidekiq"

RSpec::Sidekiq.configure do |config|
  config.warn_when_jobs_not_processed_by_sidekiq = false
  config.clear_all_enqueued_jobs = true
end

RSpec.configure do |config|
  config.before do
    Sidekiq::Worker.clear_all if defined?(Sidekiq::Worker)
  end
end
