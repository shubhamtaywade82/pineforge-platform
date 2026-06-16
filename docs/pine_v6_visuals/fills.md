# Visuals: Fills

Source: https://www.tradingview.com/pine-script-docs/visuals/fills/

## Three fill mechanisms

| Mechanism | Between | Function |
|-----------|---------|----------|
| Plot/hline fill | Two plots or two hlines | `fill()` |
| Line fill | Two `line` objects | `linefill.new()` |
| Box/polyline | Self-contained | `bgcolor` / `fill_color` params |

## fill() for plots

```pine
p1 = plot(ta.sma(close, 5))
p2 = plot(ta.sma(close, 20))
fill(p1, p2, color.new(color.green, 90))
```

**Rules:**
- Must use two **plot** IDs or two **hline** IDs — cannot mix
- For oscillator-to-zero fill, plot zero instead of `hline(0)`:

```pine
oscPlot = plot(oscillator)
zeroPlot = plot(0, color = color.silver)
fill(oscPlot, zeroPlot, color.new(color.blue, 90))
```

**Dynamic fill color:**

```pine
fillColor = ma1 > ma2 ? color.new(color.green, 90) : color.new(color.red, 90)
fill(ma1Plot, ma2Plot, fillColor)
```

## fill() for hlines

```pine
h1 = hline(50, "+50", color.lime)
h2 = hline(25, "+25", color.green)
fill(h1, h2, color.new(color.lime, 90))
```

## linefill

```pine
linefill channelFill = linefill.new(pivotHighLine, pivotLowLine, color.new(fillColor, 90))
linefill.set_color(channelFill, newColor)
```

- One linefill per line pair (new call replaces old)
- Cannot move directly — moves with referenced lines

## Box / polyline fills

```pine
box.new(topLeft, bottomRight, bgcolor = color.purple)
polyline.new(points, closed = true, fill_color = color.new(color.blue, 60))
```

## Codegen rules

- Store plot/hline IDs in variables for `fill()`
- Fills have higher z-index than plots (drawn on top)
- `fillgaps` parameter controls na bridging behavior
- `display.all` or `display.none` only (no granular display)
