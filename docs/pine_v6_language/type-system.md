# Language: Type System

Source: https://www.tradingview.com/pine-script-docs/language/type-system/

## Qualifier hierarchy (weakest → strongest)

```text
const < input < simple < series
```

An expression inherits the **strongest** qualifier of its operands.

## Qualifiers

| Qualifier | When set | Changes at runtime? |
|-----------|----------|---------------------|
| `const` | Compile time | No |
| `input` | User inputs tab | No (reload on change) |
| `simple` | First bar | No after bar 0 |
| `series` | Every bar | Yes |

## Common compilation trap

```pine
lenInput = input.int(14, "Length")
factor = year > 2020 ? 3 : 1   // series int
adjustedLength = lenInput * factor
ma = ta.ema(close, adjustedLength)  // ERROR: length needs simple int
```

`ta.ema()` `length` requires `simple int`, not `series int`. Fix: use `ta.sma()` (accepts series length) or keep length as input/simple.

## Declaration keywords

- `const float x = 0.0` — cannot reassign; forces const qualifier
- `input.int()`, `input.float()`, etc. — return `input` qualified values
- Type keywords optional but improve readability: `float`, `int`, `bool`, `color`, `string`

## Codegen rules

- Match function parameter qualifier requirements from the reference
- Prefer `input.*()` for user-tunable parameters
- Use `const` for titles and compile-time strings
- When mixing qualifiers, expect the result to be the strongest
