# Language: Operators

Source: https://www.tradingview.com/pine-script-docs/language/operators/

## Arithmetic

`+` `-` `*` `/` `%` — `+` also concatenates strings

Int division `5/2` yields `2.5` (float). Use `int()` to truncate.

## Comparison

`<` `<=` `==` `!=` `>` `>=` — return `bool`

`==` / `!=` work on strings and colors; `<` `>` only on numbers.

## Logical

`not`, `and`, `or`

## Ternary

```pine
condition ? valueIfTrue : valueIfFalse
```

No local scope (unlike `if` structure).

## History reference `[]`

```pine
close[1]           // previous close
high[10]           // 10 bars ago
ta.sma(close, 10)[1]
```

- Cannot chain: `close[1][2]` is invalid
- Early bars return `na` — use `nz(close[1], open)`

## Precedence (high → low)

`[]` → unary `+` `-` `not` → `*` `/` `%` → `+` `-` → comparisons → `==` `!=` → `and` → `or` → `?:`

## Assignment

- `=` — declare and initialize (first use)
- `:=` — reassign mutable variable
- `+=` `-=` `*=` `/=` `%=` — compound reassignment

## Qualifier interaction

Operations promote to strongest operand qualifier. Mixing `input` + `series` → `series` result.
