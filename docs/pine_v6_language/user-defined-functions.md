# Language: User-defined Functions

Source: https://www.tradingview.com/pine-script-docs/language/user-defined-functions/

## Structure

```pine
functionName(param1, param2 = defaultVal) =>
    <body>
    <returnExpression>
```

- Header: name + parameters
- Body: indented 4 spaces (multiline) or same line (single-line)
- Must be defined in **global scope** only

## Single-line format

```pine
add(val1, val2) => val1 + val2

zScore(float source, int length) =>
    mean = ta.sma(source, length), sd = ta.stdev(source, length), (source - mean) / sd
```

Comma-separated statements; last expression is the return value.

## Multiline format

```pine
zScore(float source, int length) =>
    float mean = ta.sma(source, length)
    float sd = ta.stdev(source, length)
    (source - mean) / sd
```

Final indented line (or conditional/loop) is the return value.

## Tuple returns

```pine
sumDiff(float val1, float val2) => [val1 + val2, val1 - val2]

[sum, diff] = sumDiff(open, close)
[_, diff] = sumDiff(a, b)  // _ discards first result
```

Cannot reuse existing variables in tuple assignment — only new identifiers.

## Restrictions

- Cannot modify parameters or global variables
- No recursion (cannot call itself)
- Cannot call functions that require global scope from inside
- Parameter and return types must be consistent across all calls
- Each call creates independent scope/history

## Parameter types

```pine
pass(source) => source                    // inherits argument type each call
pass(int source) => source                // int only; may promote to series int
pass(simple int source) => source         // simple or weaker only
```

Type keyword required when:

- Default is `na`
- Qualifier keyword used
- `export` (library functions — all params typed)
- First param of `method` definition

## Qualifier keywords

| Keyword | Meaning |
|---------|---------|
| `const` | Compile-time only; non-exported functions |
| `simple` | Fixed after bar 0 |
| `series` | Can change every bar |

Use `simple` for parameters that select which `ta.*()` runs — dynamic selection breaks series history:

```pine
calcAvg(float source, int length, simple string avgType) =>
    switch avgType
        "ema" => ta.ema(source, length)
        "sma" => ta.sma(source, length)
```

## Documentation annotations

```pine
//@function Calculates z-score over length bars.
//@param source Series to analyze.
//@param length Lookback period.
//@returns Z-score value.
zScore(float source, int length) => ...
```

## Library export

```pine
export myFunc(float x) => x * 2
```

Exported functions require explicit types on all parameters.
