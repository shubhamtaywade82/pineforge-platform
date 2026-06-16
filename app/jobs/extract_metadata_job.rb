# frozen_string_literal: true

class ExtractMetadataJob < ApplicationJob
  queue_as :default

  def perform(indicator_id)
    indicator = Indicator.find(indicator_id)
    return if indicator.metadata["indicator_name"].present?

    Generators::MetadataService.new(indicator: indicator).call
  end
end
