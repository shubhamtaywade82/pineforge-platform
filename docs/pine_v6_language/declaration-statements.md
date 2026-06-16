# Language: Declaration Statements

Source: https://www.tradingview.com/pine-script-docs/language/declaration-statements/

## Rules

- Exactly **one** declaration in global scope
- Place directly below `//@version=6`
- All declaration parameters require **`const`** arguments

## indicator()

```pine
indicator(title, shorttitle, overlay, format, precision, scale, ...)
```

- `title` — required display name
- `overlay=true` — plot on main chart pane; `false` — separate pane (default)
- `scale` — `scale.left`, `scale.right`, `scale.none`
- Must produce at least one visual output (`plot`, drawings, etc.)
- Executes once per historical bar; once per tick on realtime bar

## strategy()

```pine
strategy(title, overlay, margin_long, margin_short, initial_capital, commission_type, ...)
```

- Supports `strategy.entry()`, `strategy.exit()`, `strategy.close()`
- Backtests in Strategy Tester
- On realtime bars: typically executes once when bar closes (configurable)

## library()

```pine
library(title, overlay)
```

- Export functions with `export` keyword
- Imported by other scripts via `import`

## Codegen defaults

```pine
indicator("Descriptive Title", overlay=true)   // overlay indicators
indicator("Oscillator", overlay=false)       // pane indicators
strategy("Strategy Name", overlay=true, margin_long=100, margin_short=100)
```
