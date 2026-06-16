# frozen_string_literal: true

require "rails_helper"

RSpec.describe Generators::RepairService do
  let(:router) { instance_double(Llm::Router, last_model_used: "test-model", last_generation_ms: 10) }
  let(:service) { described_class.new(router: router) }
  let(:builder) { Prompts::Builder.new(prompt: "Build RSI", script_type: "indicator") }
  let(:events) { [] }
  let(:emit) { ->(payload) { events << payload } }

  it "attempts repair when validation fails" do
    invalid_code = 'study("Old")'
    fixed_code = "//@version=6\nindicator(\"Fixed\")\nplot(close)"

    allow(router).to receive(:chat) do |**kwargs, &block|
      next unless kwargs[:stream] && block

      fixed_code.each_char { |char| block.call(char) }
    end

    validation, code = service.call(
      builder: builder,
      initial_code: invalid_code,
      prompt: "Build RSI",
      emit: emit
    )

    expect(events.any? { |event| event[:type] == "repair_attempt" }).to be(true)
    expect(validation[:passed]).to be(true)
    expect(code).to include("indicator")
  end
end
