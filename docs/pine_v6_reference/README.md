# Pine Script v6 Symbol Reference

Structured symbol index for `Pine::ReferenceLookup` (codegen-time API context).

## Source

Function docs are parsed from [codenamedevan/pinescriptv6](https://github.com/codenamedevan/pinescriptv6) `reference/functions/*.md`, derived from the [TradingView Pine Script v6 Reference](https://www.tradingview.com/pine-script-reference/v6/).

## Files

| File | Purpose |
|------|---------|
| `symbols.json` | Committed lookup index (symbol → summary, remarks, example) |
| `sources/` | Downloaded markdown (gitignored; refresh via build script) |

## Refresh

```bash
bin/pine-reference-build
```

Then commit `symbols.json` if entries changed.

## Runtime

`Pine::ReferenceLookup.call(prompt:, script_type:)` resolves explicit symbols (`ta.rsi`), keyword aliases (`RSI` → `ta.rsi`), and script-type defaults, then injects matching entries into LLM prompts via `Prompts::Builder`.
