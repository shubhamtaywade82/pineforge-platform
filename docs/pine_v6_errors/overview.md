# Errors: Overview

Source: https://www.tradingview.com/pine-script-docs/errors/overview/

## Error categories

| Type | When | UI |
|------|------|-----|
| **Runtime error** | During execution on dataset | Red exclamation in status line; script stops |
| **Compilation error** | Before run; invalid syntax/types | Red highlight in editor |
| **Compiler warning** | Before run; compiles but risky | Orange highlight in editor |

Custom runtime errors: `runtime.error("message")`.

## Documented codes (this KB)

| Code | Message | Fix summary |
|------|---------|-------------|
| **CE10101** | Condition of `if`/`switch` must be `bool` | Use comparisons, `bool()`, or `not na(x)` |
| **CW10003** | Function should be called each calculation | Move history-dependent calls to global scope |
| **RE10139** | Memory limits exceeded | Optimize `request.*()`, drawings, buffers |
| **RE10143** | Historical offset beyond buffer limit | `max_bars_back()`, larger early offset, or `time` buffer for drawings |

## Codegen rules

- v6: never use numeric values as `if` conditions — explicit `bool` only
- Call `ta.*` and history-using functions unconditionally every bar; gate results with `if`
- Return scalars from `request.security()`, not collection IDs, unless last-bar only
- Declare `max_bars_back()` when lookback differs between historical and realtime bars
