# Primer: First Indicator

Source: https://www.tradingview.com/pine-script-docs/primer/first-indicator/

## Pine Editor

The Pine Editor provides syntax highlighting, hover docs, Reference Manual popup (`Ctrl`/`Cmd`+click), autocomplete (`Ctrl`+`Space` / `Cmd`+`I`), and compile-on-save when a script is on the chart.

## MACD — version 1 (step-by-step)

```pine
//@version=6
indicator("MACD #1")
fast = 12
slow = 26
fastMA = ta.ema(close, fast)
slowMA = ta.ema(close, slow)
macd = fastMA - slowMA
signal = ta.ema(macd, 9)
plot(macd, color = color.blue)
plot(signal, color = color.orange)
```

Line-by-line:

- `//@version=6` — compiler version annotation (first line convention).
- `indicator("title")` — declares an indicator and chart title.
- `ta.ema(close, length)` — EMA on the close series.
- `plot(series, color=...)` — draws a line in the indicator pane.

## MACD — version 2 (inputs + builtin)

```pine
//@version=6
indicator("MACD #2")
fastInput = input(12, "Fast length")
slowInput = input(26, "Slow length")
[macdLine, signalLine, histLine] = ta.macd(close, fastInput, slowInput, 9)
plot(macdLine, color = color.blue)
plot(signalLine, color = color.orange)
```

Improvements:

- `input()` exposes editable settings in the script Inputs tab.
- `ta.macd()` returns three series in one call (tuple destructuring).
- Suffix user-input variables with `Input` per Pine style guide.

## Key builtins introduced

- `indicator()`, `input()`, `ta.ema()`, `ta.macd()`, `plot()`, `close`, `color.blue`, `color.orange`
