# Primer: Next Steps

Source: https://www.tradingview.com/pine-script-docs/primer/next-steps/

## Indicators vs strategies

| | Indicator | Strategy |
|---|-----------|----------|
| Backtesting | No | Yes (Strategy Tester) |
| Orders | No `strategy.*()` | `strategy.*()` → broker emulator |
| Performance | Lighter, faster | Heavier |
| Modes | overlay or pane | overlay or pane |
| Alerts | Yes | Yes |

Use an **indicator** when you do not need simulated orders.

## Execution model

A Pine script does not run once and exit. It executes **once per bar**, left to right:

- **Historical bars** — already closed when the script runs on them.
- **Realtime bar** — last bar while the market is open; re-executes on price/volume updates, then once more when the bar closes.

On historical bars, `close` is that bar's close. On the realtime bar, `close` is the current price until the bar closes.

Scripts do **not** recalculate all historical bars on every tick — only the realtime bar updates repeatedly.

Strategies normally execute once per realtime bar when it closes (configurable to every tick).

## Time series

The core data structure is a **time series**: one value per bar, growing as bars process.

Past values: history-referencing operator `[]`.

```pine
close[1]   // previous bar's close
```

Time series are **not** arrays — do not model them as random-access arrays.

Understanding execution model + time series is essential before writing non-trivial Pine.

## Documentation map

- **User Manual** — concepts and how-to (this primer lives here).
- **Reference Manual** — what each construct does; use for every non-trivial script.
  - Web: https://www.tradingview.com/pine-script-reference/v6/
  - Editor popup: `Ctrl`/`Cmd`+click keyword, or More → Reference Manual

Match documentation version to `//@version=6` in your script.

## Manual sections

- **Language** — syntax and execution.
- **Concepts** — task-oriented how-tos.
- **Writing** — publishing and tooling.
- **FAQ**, **Error messages**, **Release Notes**, **Migration guides**.

## Publishing

Public scripts are moderated (Script Publishing Rules). Private scripts can stay in your account; private links can be shared without public publication.
