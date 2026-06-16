# Language: Script Structure

Source: https://www.tradingview.com/pine-script-docs/language/script-structure/

## General structure

```text
<version>
<declaration_statement>
<code>
```

## Version

```pine
//@version=6
```

Always place at the top. Use v6 for all new PineForge output.

## Declaration statement (exactly one)

| Function | Purpose |
|----------|---------|
| `indicator()` | Plots, alerts, logs — no orders |
| `strategy()` | Backtesting + `strategy.*()` orders |
| `library()` | Export functions/types for import |

Requirements:

- **Indicator** — at least one output: `plot()`, `plotshape()`, `line.new()`, `alert()`, etc.
- **Strategy** — at least one order or output function
- **Library** — export at least one function, method, type, or enum

## Code organization

- Global scope statements must start at column 0 (no leading whitespace)
- Local blocks indented 4 spaces or 1 tab
- Comments: `//`
- Line wrapping allowed; inside `()` parens indentation is flexible

## Compiler annotations

- `//@version=6` — language version
- `//@description` — library description
- `//@function`, `//@param`, `//@returns` — document UDFs
- `//@type`, `//@field` — document UDTs
- `//#region` / `//#endregion` — collapsible regions

## Minimal examples

```pine
//@version=6
indicator("My Script")
plot(close)
```

```pine
//@version=6
strategy("My Strategy", overlay=true)
if ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
    strategy.entry("Long", strategy.long)
```
