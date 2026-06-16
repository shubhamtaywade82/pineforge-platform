# Visuals: Plots

Source: https://www.tradingview.com/pine-script-docs/visuals/plots/

## plot()

```pine
plot(series, title, color, linewidth, style, trackprice, histbase, offset, join, editable, show_last, display, format, precision, force_overlay, linestyle) → plot
```

Primary serial visual — one value per bar.

## Styles

| Style | Use |
|-------|-----|
| `plot.style_line` | Default continuous line |
| `plot.style_linebr` | Discontinuous (gaps on na) |
| `plot.style_stepline` | Staircase |
| `plot.style_area` | Filled area to `histbase` |
| `plot.style_columns` | Volume-style columns |
| `plot.style_histogram` | Histogram (`linewidth` = bar width px) |
| `plot.style_circles` / `plot.style_cross` | Markers |

## Key parameters

- `series` — required; bool must convert: `condition ? 1 : 0`
- `color` — series color; `na` hides bar
- `offset` — shift plot N bars (fixed, input int)
- `histbase` — reference for area/columns/histogram
- `display` — `display.all`, `display.none`, combine with `+`/`-`
- `format` — `format.price`, `format.percent`, `format.volume`
- `force_overlay` — plot on main chart from pane script

## Conditional plotting (global scope only)

```pine
plot(ta.change(pHi) != 0 ? na : pHi, "High pivot")
plot(longSignal ? low - ta.tr : na, "Signal", color.blue, 2, plot.style_circles)
```

Cannot call `plot()` inside `if`/loops/functions — use `na` to hide.

## Other plot functions

`plotshape()`, `plotchar()`, `plotarrow()`, `plotbar()`, `plotcandle()`, `plotcandle()` — see text-and-shapes and bar-plotting docs.

## External uses

Plots work with:
- CSV export
- Alerts (including `{{plot("Title")}}` placeholders)
- `input.source()` from other indicators
- Pine Screener

`display.none` hides visuals but keeps these uses.

## Limits

Max **64 plots** per script. Complex plots may count more than once.

## Codegen rules

- All `plot()` calls at global scope
- Use `format.mintick` / `format.volume` for readable values
- Layer plots for contrast (wide faint + thin sharp line)
- `hline(0)` alternative to `plot(0)` for zero reference
