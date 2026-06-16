# frozen_string_literal: true

module Pine
  class Validator
    V6_DEPRECATED_PATTERNS = [
      { pattern: /^study\(/, message: "Use indicator() or strategy(), not study()" },
      { pattern: /(?<!request\.)\bsecurity\(/, message: "Use request.security() not bare security()" },
      { pattern: /transp\s*:/, message: "Use color.new() for transparency, not transp:" },
      { pattern: /array\.new_\w+\(/, message: "Use array.new<type>() not array.new_TYPE()" },
      { pattern: /\.transp\b/, message: "Deprecated .transp property, use color.new()" }
    ].freeze

    V6_REQUIRED = [
      { pattern: /^\/\/@version=6/m, message: "Missing //@version=6 on first line" },
      { pattern: /indicator\(|strategy\(|library\(/, message: "Missing declaration function" }
    ].freeze

    def initialize(code)
      @code = code.to_s
      @lines = @code.split("\n")
      @errors = []
      @warnings = []
    end

    def validate
      check_required
      check_deprecated
      { passed: @errors.empty?, errors: @errors, warnings: @warnings }
    end

    private

    def check_required
      V6_REQUIRED.each do |rule|
        @errors << rule[:message] unless @code.match?(rule[:pattern])
      end
    end

    def check_deprecated
      @lines.each_with_index do |line, idx|
        next if line.strip.start_with?("//")

        V6_DEPRECATED_PATTERNS.each do |rule|
          @errors << "Line #{idx + 1}: #{rule[:message]}" if line.match?(rule[:pattern])
        end
      end
    end
  end
end
