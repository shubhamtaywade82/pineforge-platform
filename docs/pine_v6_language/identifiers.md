# Language: Identifiers

Source: https://www.tradingview.com/pine-script-docs/language/identifiers/

## Rules

- Start with letter (`A-Z`, `a-z`) or underscore `_`
- Continue with letters, digits, or underscores
- Case-sensitive
- `3barsDown` is invalid (cannot start with digit)

## Style guide (PineForge convention)

| Kind | Convention | Example |
|------|------------|---------|
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_LOOKBACK` |
| Other identifiers | `camelCase` | `fastLength`, `plotColor` |
| User inputs | suffix `Input` | `fastLengthInput` |

## Valid examples

```pine
myVar
_myVar
my123Var
functionName
MAX_LEN
zeroOne(boolValue) =>
    boolValue ? 1 : 0
```
