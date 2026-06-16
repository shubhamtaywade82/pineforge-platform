# frozen_string_literal: true

require "rails_helper"

RSpec.describe ExtractMetadataJob, type: :job do
  it "updates indicator metadata" do
    indicator = create(:indicator, metadata: {})
    metadata_service = instance_double(Generators::MetadataService, call: { "indicator_name" => "RSI Pro" })
    allow(Generators::MetadataService).to receive(:new).and_return(metadata_service)

    described_class.perform_now(indicator.id)

    expect(Generators::MetadataService).to have_received(:new).with(indicator: indicator)
  end
end
