# frozen_string_literal: true

require "diff/lcs"

module Indicators
  class DiffService
    def initialize(before_code:, after_code:)
      @before_code = before_code
      @after_code = after_code
    end

    def call
      before_lines = @before_code.to_s.lines
      after_lines = @after_code.to_s.lines
      diffs = Diff::LCS.sdiff(before_lines, after_lines)

      diffs.map do |change|
        {
          before: change.old_element,
          after: change.new_element,
          action: change.action
        }
      end
    end
  end
end
