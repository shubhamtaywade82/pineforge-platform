# Visuals: Bar Plotting

Source: https://www.tradingview.com/pine-script-docs/visuals/bar-plotting/

## plotcandle()

```pine
plotcandle(open, high, low, close, title, color, wickcolor, editable, show_last, bordercolor, display) → void
```

Plots candle bodies. If any OHLC arg is `na`, no candle drawn.

```pine
bodyColor = close >= open ? color.lime : color.red
plotcandle(open, high, low, close, color = bodyColor, wickcolor = bodyColor)
```

**Smoothed candles:**

```pine
o = ta.sma(open, len)
h = ta.sma(high, len)
l = ta.sma(low, len)
c = ta.sma(close, len)
plotcandle(o, h, l, c, wickcolor = close > c ? color.green : color.red)
```

**HTF candles on LTF:**

```pine
[o, h, l, c] = request.security(syminfo.tickerid, "D", [open, high, low, close], gaps = barmerge.gaps_on)
plotcandle(timeframe.isintraday ? o : na, h, l, c, color = bodyColor, wickcolor = wickColor)
```

## plotbar()

```pine
plotbar(open, high, low, close, title, color, editable, show_last, display, force_overlay) → void
```

OHLC bars (no wick/border params). Same coloring patterns as `plotcandle()`.

## Codegen rules

- Can plot synthetic OHLC (not just built-in `open`/`high`/`low`/`close`)
- `color` is series — dynamic bull/bear coloring works
- Use `gaps = barmerge.gaps_on` for HTF data on intraday charts
- Guard with `timeframe.isintraday` when HTF only makes sense on LTF
