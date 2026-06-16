# frozen_string_literal: true

module Pine
  class ReferenceIndexBuilder
    HEADING_PATTERN = /^##\s+([a-z][a-z0-9_.]*\(\)?)\s*$/i
    SECTION_PATTERN = /^###\s+(.+)$/

    def initialize(source_dir:)
      @source_dir = Pathname.new(source_dir)
    end

    def build
      symbols = {}
      aliases = default_aliases

      markdown_files.each do |path|
        parse_file(path, symbols)
      end

      symbols.each_key do |symbol|
        short_name = symbol.split(".").last
        aliases[short_name] = symbol unless aliases.key?(short_name)
      end

      {
        version: 1,
        generated_at: Time.now.utc.iso8601,
        source: "docs/pine_v6_reference/sources/*.md",
        symbols: symbols,
        aliases: aliases.sort.to_h
      }
    end

    private

    def markdown_files
      @source_dir.glob("*.md").sort
    end

    def parse_file(path, symbols)
      current_symbol = nil
      current_section = nil
      sections = {}
      buffer = []
      preamble = []

      path.read.each_line do |line|
        if (match = line.match(HEADING_PATTERN))
          store_symbol(symbols, current_symbol, sections, preamble) if current_symbol.present?
          current_symbol = normalize_symbol(match[1])
          current_section = nil
          buffer = []
          preamble = []
          sections = {}
          next
        end

        if (match = line.match(SECTION_PATTERN))
          flush_section(sections, current_section, buffer)
          current_section = match[1].strip
          buffer = []
          next
        end

        next unless current_symbol

        if current_section
          buffer << line
        else
          preamble << line
        end
      end

      store_symbol(symbols, current_symbol, sections, preamble)
    end

    def store_symbol(symbols, symbol, sections, preamble)
      return if symbol.nil? || symbol.empty?

      sections["Summary"] = preamble.join.strip if preamble.join.strip.present?
      symbols[symbol] = entry_for(symbol, sections)
    end

    def entry_for(symbol, sections)
      {
        symbol: symbol,
        namespace: symbol.include?(".") ? symbol.split(".").first : "core",
        signature: "#{symbol}()",
        summary: sections["Returns"].presence || sections["Summary"].presence || sections.values.first.to_s.strip.first(400),
        remarks: sections["Remarks"].to_s.strip.first(400),
        example: extract_example(sections["Code Example"].to_s)
      }
    end

    def extract_example(text)
      return "" if text.blank?

      if text.include?("```")
        text[/```(?:pine)?\n(.*?)```/m, 1].to_s.strip.lines.first(8).join
      else
        text.lines.first(8).join.strip
      end
    end

    def flush_section(sections, name, buffer)
      return if name.blank?

      sections[name] = buffer.join.strip
    end

    def normalize_symbol(raw)
      raw.delete_suffix("()").strip.downcase
    end

    def default_aliases
      {
        "rsi" => "ta.rsi",
        "ema" => "ta.ema",
        "sma" => "ta.sma",
        "macd" => "ta.macd",
        "atr" => "ta.atr",
        "vwap" => "ta.vwap",
        "crossover" => "ta.crossover",
        "crossunder" => "ta.crossunder",
        "bollinger" => "ta.bb",
        "stochastic" => "ta.stoch",
        "security" => "request.security",
        "multitimeframe" => "request.security"
      }
    end
  end
end
