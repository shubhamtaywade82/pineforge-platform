# Language: Execution Model

Source: https://www.tradingview.com/pine-script-docs/language/execution-model/

## Bar-by-bar execution

Pine Script executes once per bar, left to right across the dataset. Each execution calculates for the current bar only.

Built-ins like `open`, `high`, `low`, `close`, `volume` update to the current bar before each execution.

## Default vs persistent variables

Without `var`, a variable is re-declared and re-initialized on every bar:

```pine
int x = 0
x += 10  // always plots 10 — x resets each bar
```

With `var`, initialization happens only on the first bar; value persists:

```pine
var int x = 0
x += 10  // 10, 20, 30, ... across bars
```

Use `varip` for tick-level persistence on the realtime bar.

## History referencing

- `close[1]` — previous bar's close
- `close[n]` — n bars back; beyond available history returns `na`
- `ta.change(close, 10)` — built-in history calculation
- Series grow bar by bar; `[n]` offset is dynamic

## Realtime bars

- Historical bars: one execution per bar, values final
- Realtime bar: re-executes on each tick; rollback clears unconfirmed tick data before recalc
- Only the final tick of a realtime bar commits to the time series

## Codegen rules

- Do not assume single-run execution
- Use `var` when state must carry across bars
- Guard early bars where `[n]` returns `na` with `nz()` or `na()` checks
- `barstate.islast`, `barstate.isrealtime`, `barstate.isconfirmed` for bar-type logic
