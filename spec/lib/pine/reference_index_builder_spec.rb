# frozen_string_literal: true

require "rails_helper"

RSpec.describe Pine::ReferenceIndexBuilder do
  let(:source_dir) { Rails.root.join("tmp/pine_reference_spec") }

  before do
    FileUtils.mkdir_p(source_dir)
    File.write(
      source_dir.join("sample.md"),
      <<~MARKDOWN
        ## ta.sample()

        Sample summary line.

        ### Returns
        A sample return value.

        ### Code Example
        ```pine
        plot(ta.sample(close))
        ```
      MARKDOWN
    )
  end

  after { FileUtils.rm_rf(source_dir) }

  it "builds symbol entries from markdown headings" do
    payload = described_class.new(source_dir: source_dir).build

    expect(payload[:symbols]["ta.sample"][:summary]).to eq("A sample return value.")
    expect(payload[:symbols]["ta.sample"][:example]).to include("plot(ta.sample(close))")
  end
end
