# Language: Built-ins

Source: https://www.tradingview.com/pine-script-docs/language/built-ins/

## Overview

Pine has hundreds of built-in variables and functions organized by namespace. The [Pine Script v6 Reference Manual](https://www.tradingview.com/pine-script-reference/v6/) is the definitive source for signatures and parameter types.

Variables and functions in the same family share a namespace prefix (e.g. `ta.sma`).

## Key namespaces

| Namespace | Examples |
|-----------|----------|
| `ta` | `ta.sma()`, `ta.ema()`, `ta.rsi()`, `ta.crossover()`, `ta.highest()` |
| `math` | `math.abs()`, `math.max()`, `math.round_to_mintick()` |
| `request` | `request.security()`, `request.dividends()`, `request.financial()` |
| `str` | `str.format()`, `str.tostring()`, `str.length()` |
| `input` | `input.int()`, `input.float()`, `input.symbol()`, `input.enum()` |
| `color` | `color.new()`, `color.rgb()`, `color.from_gradient()` |
| `strategy` | `strategy.entry()`, `strategy.exit()`, `strategy.close()` |
| `array` / `matrix` / `map` | Collection constructors and methods |

## Side-effect vs return-value functions

**Side effects only:** `indicator()`, `strategy()`, `library()`, `plot()`, `bgcolor()`, `strategy.entry()`, `alert()`

**Return values (may also have side effects):** `ta.*`, `math.*`, `array.get()`, `label.new()` (returns ID)

## Function signatures

```pine
ta.vwma(source, length) → series float
```

Each parameter has a required qualified type. Mismatch causes compile errors.

## Calling conventions

```pine
myVwma = ta.vwma(close, 20)
myVwma = ta.vwma(source = close, length = 20)  // keyword args
```

Keyword arguments can reorder params, but:

- Use keywords for all args if reordering, OR
- Skip none of the leading positional args

```pine
indicator("Example", "Ex", true, max_bars_back = 100)  // OK
indicator(precision = 3, "Example")  // ERROR
```

## Variable vs function versions

Some built-ins exist as both variable and function:

- `ta.tr` vs `ta.tr(true)` — function handles `na` previous close
- `time` vs `time(timeframe)` vs `time(timeframe, session, timezone)`

## Codegen rules

- Always verify parameter qualified types in the Reference Manual
- Use `Pine::ReferenceLookup` / symbol index for `ta.*` and `request.*` signatures
- Prefer built-ins over reimplementing (performance and correctness)
- Match `simple` vs `series` requirements for length/period parameters
