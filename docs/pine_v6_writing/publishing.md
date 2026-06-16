# Writing: Publishing

Source: https://www.tradingview.com/pine-script-docs/writing/publishing/

## Publication types

| Setting | Options |
|---------|---------|
| Privacy | Public (community feed) / Private (URL only) |
| Visibility | Open (source visible) / Protected / Invite-only |

Default license for open-source: **Mozilla Public License 2.0**.

## Pre-publish checklist

### Source code

- Debug with Pine Logs; fix logic errors
- No `request.security()` lookahead bias on historical bars
- Profile with Pine Profiler; optimize hot paths
- Input guards: `minval`, `maxval`, `options`, `runtime.error()` for misuse
- Follow style guide: naming, organization, `//@function` docs
- Meaningful `indicator()` / `strategy()` title

### Chart

- Script active on chart; clean — remove unrelated scripts/drawings
- Default settings (reset if changed)
- Status line shows symbol, timeframe, script name
- No Heikin Ashi / Renko / etc. for strategies or trade signals

### Strategy report

- Realistic `initial_capital`, `commission_*`, `slippage`, `margin_*`
- Sustainable risk per trade (<10% equity typical)
- 100+ trades preferred for meaningful backtest
- Resolve Strategy Tester warnings

### Title and description

- English, ASCII only, searchable, no ALL CAPS words
- No misleading claims ("90% win rate")
- No ads, social handles, or website URLs
- Description: purpose, how it works, how to use it, originality
- Markup: `[b]`, `[i]`, `[pine]`, `[list]`, `[url=]`, `$SYMBOL`

## Workflow tip

1. Publish **private** draft first (always editable)
2. Validate widget, page, chart, description
3. Copy description → publish public version
4. Delete private draft

Public title/description editable for **15 minutes** only.

## Updates

"Update existing script" → release notes field (dated, appended to description).

Privacy and visibility **cannot change** after publish.

## House rules summary

- Original, helpful content — no clones without meaningful improvement
- Credit open-source reuse; improvements required
- Clean chart demonstrating script only
- Self-contained description even for open-source scripts

## Codegen rules

Generated scripts for PineForge users are typically private — still follow style guide and avoid lookahead patterns that would fail publication review.
