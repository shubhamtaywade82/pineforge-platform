# Writing: Style Guide

Source: https://www.tradingview.com/pine-script-docs/writing/style-guide/

## Naming

| Kind | Convention | Examples |
|------|------------|----------|
| Variables, functions | `camelCase` | `maFast`, `pivotHi()`, `roundedOHLC()` |
| Constants | `SNAKE_CASE` | `BULL_COLOR`, `MAX_LOOKBACK` |
| Inputs | suffix `Input` | `maLengthInput`, `bearColorInput` |
| Plot/hline IDs | suffix `PlotID` | `maPlotID` |
| Collections | suffix `Array` | `levelsColorArray` |

## Script organization (recommended order)

```text
<license>
<version>              //@version=6
<declaration_statement>  indicator() | strategy() | library()
<import_statements>
<constant_declarations>
<inputs>
<function_declarations>
<calculations>
<strategy_calls>
<visuals>
<alerts>
```

## Constants

- Use `const` keyword + literal or const built-in
- Group at top with `SNAKE_CASE`
- Do **not** use `var` for constants (minor perf penalty)
- Reuse literals via named constants (`MS_IN_DAY` not `86400000`)

## Inputs

- All inputs in one section near top
- Suffix with `Input`
- Use constants for `options` and `tooltip` text

## Functions

- Global scope only (no nested functions)
- Minimize global variable dependencies
- Document with `//@function`, `//@param`, `//@returns`

## Spacing

```pine
int a = close > open ? 1 : -1
plot(close, color = color.red)
```

Space both sides of operators; space after commas.

## Line wrapping

- Outside parentheses: indent **not** a multiple of 4 (2 spaces OK)
- Inside parentheses: any indentation including 4 spaces
- Multiline strings: `"""` or `'''` — indentation becomes literal text

## Explicit typing

Optional but recommended for readability and debugging:

```pine
float ma = ta.sma(close, 20)
array<float> prices = array.new<float>(0)
```

## PineForge codegen defaults

Follow this structure in generated scripts: version → declaration → constants → inputs → functions → logic → plots/drawings → alerts.
