# Writing: Limitations

Source: https://www.tradingview.com/pine-script-docs/writing/limitations/

## Time limits

| Limit | Value |
|-------|-------|
| Compilation | 2 minutes (3 warnings → 1 hour ban) |
| Execution (basic) | 20 seconds total |
| Execution (other plans) | 40 seconds total |
| Single loop per bar | 500 ms |

## Plot limits

- Max **64 plot counts** per script
- `plotcandle()` can cost up to **7** counts per call
- `bgcolor`, `fill`, `alertcondition` each cost 1
- Comment out plots to diagnose count; runtime error shows total

## Drawing limits

| Type | Default shown | Max (`max_*_count`) |
|------|---------------|---------------------|
| line, box, label | 50 | 500 each |
| polyline | 50 | 100 |

`na` drawing properties still count — use conditional `if` to skip creation.

## Table limits

- Max **9 tables** (one per `position.*` anchor)
- Same position → newest wins

## request.*() limits

| Limit | Value |
|-------|-------|
| Unique calls | 40 (64 Ultimate plan) |
| Identical calls | Count once (deduped) |
| Tuple elements (all calls combined) | 127 max — use UDT beyond |
| Intrabars (LTF data) | 100K–200K bars by plan |

```pine
// 50 identical calls = 1 unique request
for i = 1 to 50
    reqSum += request.security(syminfo.tickerid, "1D", close)
```

Library `request.*()` inside imported functions counts toward limit.

## Memory and size

| Limit | Value |
|-------|-------|
| Compiled IL tokens | 100,000 per script |
| Imported library tokens | 1,000,000 total |
| Variables per scope | 1,000 |
| Compilation request size | 5 MB |
| Collection elements | 100,000 (maps: 50,000 pairs) |

Unused code omitted from compiled form (no token cost).

## Historical buffer

| Series | Max bars back |
|--------|---------------|
| Most series | 5,000 |
| OHLC, time, etc. | 10,000 |

Fix: `max_bars_back()` or `max_bars_back` in declaration.

## Bar positioning (drawings)

| Direction | Limit |
|-----------|-------|
| Past (`xloc.bar_index`) | 10,000 bars |
| Future | 500 bars |

## Chart bars by plan

5,000 (basic) → 40,000 (Ultimate).

## Strategy backtesting

- Max **9,000 orders** (trimmed; use `strategy.closedtrades.first_index`)
- Deep Backtesting: 1,000,000 orders

## Codegen rules

- Stay under 64 plot counts — watch `plotcandle`/`plotbar` cost
- Set `max_labels_count` / `max_lines_count` when needed
- Batch `request.security()` into tuples; limit unique contexts
- Use `ta.*` built-ins instead of loops where possible
- Avoid creating drawings every bar — update or use `barstate.islast`
- Declare `max_bars_back` when using long `[n]` lookbacks
