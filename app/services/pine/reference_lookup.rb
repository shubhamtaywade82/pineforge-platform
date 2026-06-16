# frozen_string_literal: true

require "json"

module Pine
  class ReferenceLookup
    INDEX_PATH = Rails.root.join("docs/pine_v6_reference/symbols.json")
    DEFAULT_BUDGET = ENV.fetch("PINE_REFERENCE_TOKEN_BUDGET", 1500).to_i
    SYMBOL_PATTERN = /\b([a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)+)\b/i
    MAX_SYMBOLS = 8

    class << self
      def enabled?
        INDEX_PATH.exist?
      end

      def call(prompt:, script_type: nil, budget: DEFAULT_BUDGET)
        new(prompt: prompt, script_type: script_type, budget: budget).call
      end

      def reset_index!
        @index = nil
      end

      def index
        @index ||= load_index
      end

      private

      def load_index
        return empty_index unless INDEX_PATH.exist?

        JSON.parse(INDEX_PATH.read)
      rescue JSON::ParserError => e
        Rails.logger.warn("[Pine::ReferenceLookup] invalid index: #{e.message}")
        empty_index
      end

      def empty_index
        { "symbols" => {}, "aliases" => {} }
      end
    end

    def initialize(prompt:, script_type: nil, budget: DEFAULT_BUDGET)
      @prompt = prompt.to_s
      @script_type = script_type.to_s
      @budget = budget
    end

    def call
      return "" unless self.class.enabled?

      entries = resolve_symbols
      return "" if entries.empty?

      format_entries(entries)
    end

    private

    def resolve_symbols
      symbols = explicit_symbols + aliased_symbols + script_type_symbols
      symbols = symbols.map(&:downcase).uniq.first(MAX_SYMBOLS)

      symbols.filter_map do |symbol|
        self.class.index.dig("symbols", symbol)
      end
    end

    def explicit_symbols
      @prompt.scan(SYMBOL_PATTERN).flatten
    end

    def aliased_symbols
      words = @prompt.downcase.scan(/[a-z][a-z0-9_]*/)

      words.filter_map do |word|
        self.class.index.dig("aliases", word)
      end
    end

    def script_type_symbols
      candidates = case @script_type
                   when "strategy"
                     %w[strategy.entry strategy.exit ta.crossover request.security]
                   when "library"
                     %w[export]
                   else
                     %w[indicator plot input.int ta.rsi ta.ema]
                   end

      candidates.select { |symbol| self.class.index.dig("symbols", symbol) }
    end

    def format_entries(entries)
      lines = ["=== PINE v6 SYMBOL REFERENCE ==="]
      remaining = @budget

      entries.each do |entry|
        block = format_entry(entry)
        break if block.length > remaining

        lines << block
        remaining -= block.length
      end

      lines.join("\n\n").first(@budget)
    end

    def format_entry(entry)
      parts = ["#{entry['signature']}: #{entry['summary']}"]
      parts << "Remarks: #{entry['remarks']}" if entry["remarks"].present?
      parts << "Example:\n#{entry['example']}" if entry["example"].present?
      parts.join("\n")
    end
  end
end
