# Language: Variable Declarations

Source: https://www.tradingview.com/pine-script-docs/language/variable-declarations/

## Forms

**Single variable:**

```pine
[float ]identifier = expression
```

**Tuple destructuring:**

```pine
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
```

## Declaration modes

| Mode | Keyword | Behavior |
|------|---------|----------|
| Default | (none) | Re-init every execution |
| Persistent | `var` | Init once on first bar |
| Tick-persistent | `varip` | Persists across realtime ticks |

## Assignment operators

| Operator | Use |
|----------|-----|
| `=` | First declaration only |
| `:=` | Reassign existing variable |
| `+=`, `-=`, `*=`, `/=`, `%=` | Compound reassignment |

```pine
var float pHi = na
pHi := nz(ta.pivothigh(5, 5), pHi)
```

## Qualified type syntax

```pine
const string TITLE = "RSI"
int lengthInput = input.int(14, "Length")
float median = ta.median(hl2, 20)
series color plotColor = close > open ? color.green : color.red
```

## Rules

- Variable usable only **after** declaration in same or nested scope
- Shadowing allowed in nested scopes
- Global variables cannot be reassigned from inside functions
- `if`/`switch` value assignments require all branches return same type

## Codegen patterns

```pine
fastInput = input.int(12, "Fast length")
slowInput = input.int(26, "Slow length")
plotColor = if close > open
    color.green
else
    color.red
```
