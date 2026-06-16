# Visuals: Levels

Source: https://www.tradingview.com/pine-script-docs/visuals/levels/

## hline()

```pine
hline(price, title, color, linestyle, linewidth, editable, display) → hline
```

Fixed horizontal levels in indicator pane.

**Constraints vs plot():**
- `price` must be **input int/float** (not series like `close`)
- `color` must be **input color** (not dynamic series color)
- Line styles: `hline.style_solid`, `hline.style_dotted`, `hline.style_dashed`

```pine
myTSI = 100 * ta.tsi(close, 25, 13)
hline(50, "+50", color.lime)
hline(0, "Zero", color.gray, linestyle = hline.style_dotted)
hline(-50, "-50", color.red)
plot(myTSI)
```

## Fills between levels

```pine
plus50 = hline(50, "+50", color.lime)
plus25 = hline(25, "+25", color.green)
zero   = hline(0, "Zero", color.gray, linestyle = hline.style_dotted)
fill(plus50, plus25, color.new(color.lime, 90))
fill(plus25, zero, color.new(color.teal, 90))
```

Both arguments must be hline IDs from `hline()` calls.

## When to use plot() instead

Use `plot()` for levels when you need:
- Dynamic price levels (series values)
- Dynamic colors
- Values that change bar to bar

```pine
plot(ta.highest(high, 20), "Resistance", color.red, 1, plot.style_linebr)
```

## Codegen rules

- `hline()` for static reference levels (RSI 70/30, TSI bands)
- Store hline IDs when using `fill()`
- Scale built-in outputs if needed (e.g. `ta.tsi()` returns ±1, multiply by 100)
