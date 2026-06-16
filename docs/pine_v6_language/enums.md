# Language: Enums

Source: https://www.tradingview.com/pine-script-docs/language/enums/

## Declare

```pine
enum Signal
    buy = "Buy signal"
    sell = "Sell signal"
    neutral
```

- Each field is a distinct `const` member of the enum type
- Optional string titles for inputs and `str.tostring()`
- Unspecified title defaults to field name string

## Access members

```pine
mySignal = Signal.neutral
Signal mySignal = na  // required type when initializing with na
```

Dot notation: `OscType.rsi`, `Exchange.BINANCE`

## Compare and switch

```pine
calcOscillator(float source, simple int length, OscType selection) =>
    switch selection
        OscType.rsi => ta.rsi(source, length)
        OscType.mfi => ta.mfi(source, length)
        OscType.cci => ta.cci(source, length)

oscInput = input.enum(OscType.rsi, "Oscillator type")
plot(calcOscillator(close, 20, oscInput))
```

Each enum is a **unique type** — `OscType` and `OscType2` with identical fields are incompatible.

## Field titles

```pine
symbol = str.tostring(exchangeInput) + ":" + str.tostring(pairInput)
plot(request.security(symbol, timeframe.period, close))
```

`str.tostring(enumMember)` returns the title. Use before `str.format()` or `log.*()`.

## Collections of enums

```pine
array<FooBar> fooBarArray = array.new<FooBar>()
map<Signal, float> signalCounters = map.new<Signal, float>()
```

Maps can use enum keys — strict control over allowed keys (up to 50,000 pairs).

## Inputs

`input.enum(OscType.rsi, "Label")` — dropdown shows field titles.

## Shadowing rules

Enum names must **not** match built-in namespaces:

```pine
enum Syminfo   // OK (capital S)
enum syminfo   // ERROR — matches syminfo namespace
enum ta        // ERROR
```

## Codegen rules

- Use enums for finite choice sets (oscillator type, signal state, exchange)
- Type function params as the enum, not `string`
- Use `simple` on enum params when selection must not change bar-to-bar inside `ta.*` wrappers
