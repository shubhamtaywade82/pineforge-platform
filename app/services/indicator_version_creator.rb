# frozen_string_literal: true

class IndicatorVersionCreator
  def self.call(indicator:, code:, prompt_delta: nil)
    new(indicator, code, prompt_delta).call
  end

  def initialize(indicator, code, prompt_delta)
    @indicator = indicator
    @code = code
    @prompt_delta = prompt_delta
  end

  def call
    @indicator.create_version!(@code, prompt_delta: @prompt_delta)
  end
end
