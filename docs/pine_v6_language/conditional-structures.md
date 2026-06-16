# Language: Conditional Structures

Source: https://www.tradingview.com/pine-script-docs/language/conditional-structures/

## if — side effects

```pine
if condition
    // 4-space indented block
else if otherCondition
    // block
else
    // block
```

Condition must be `bool` (or castable from int/float).

## if — return value

```pine
plotColor = if close > open
    color.green
else
    color.red
```

All branches must return the **same type**. Returns `na` (or `false` for bool) if no branch matches.

Prefer single `if` with `and` over deep nesting for performance:

```pine
if cond1 and cond2 and cond3
    expression
```

## switch — with expression

```pine
ma = switch maType
    "EMA" => ta.ema(close, length)
    "SMA" => ta.sma(close, length)
    => runtime.error("Unknown MA")
```

Cases must return compatible types. Default `=>` clause recommended.

## switch — without expression

```pine
switch
    longCondition  => strategy.entry("Long", strategy.long)
    shortCondition => strategy.entry("Short", strategy.short)
```

Evaluate conditions **before** switch — do not call `ta.crossover()` inside switch cases (compiler warning).

## Strategy pattern

```pine
if longCondition
    strategy.entry("Long ID", strategy.long)
else
    strategy.cancel("Long ID")
```

## barstate guards

```pine
if barstate.islast
    label.set_xy(myLabel, bar_index, hl2)
```

Local blocks require 4-space indentation.
