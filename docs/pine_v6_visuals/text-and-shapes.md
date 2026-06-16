# Visuals: Text and Shapes

Source: https://www.tradingview.com/pine-script-docs/visuals/text-and-shapes/

## Five text/shape options

| Method | Text | Dynamic text | Scope | Limit |
|--------|------|--------------|-------|-------|
| `plotchar()` | 1 char | const only | global | plots |
| `plotshape()` | string | const only | global | plots |
| `plotarrow()` | none | — | global | plots |
| `label.new()` | string | series (via str.tostring) | local OK | ~500 |
| `table` | string | series | local OK | cells |

## plotchar()

```pine
plotchar(series, title, char, location, color, offset, text, textcolor, size, display, force_overlay)
```

```pine
plotchar(longSignal, "Long", "▲", location.belowbar, color.blue, size = size.tiny)
plotchar(bar_index, "Bar index", "", location.top)  // debug in Data Window
```

- Single character only
- `text` param is const string
- Use `location.top` for debug values to avoid scale interference

## plotshape()

```pine
plotshape(series, title, style, location, color, offset, text, textcolor, size, display, force_overlay)
```

Styles: `shape.arrowup`, `shape.arrowdown`, `shape.circle`, `shape.diamond`, `shape.labelup`, `shape.xcross`, etc.

```pine
plotshape(longSignal, "Long", shape.arrowup, location.belowbar)
plotshape(cond, "", shape.arrowup, location.abovebar, text = "B\n")  // newline for stacking
```

- `text` is **const string** — cannot include prices
- `size` controls shape size, not text size

## plotarrow()

```pine
plotarrow(series, title, colorup, colordown, minheight, maxheight, display, force_overlay)
```

Up/down arrows only; arrow length from series magnitude. No text.

## label.new()

```pine
label.new(x, y, text, xloc, yloc, color, style, textcolor, size, textalign, tooltip, force_overlay)
```

```pine
if bar_index % 25 == 0
    label.new(
        bar_index, na,
        "High = " + str.tostring(high, format.mintick),
        yloc = yloc.abovebar,
        style = label.style_none,
        textcolor = color.black)
```

- Dynamic text via `+` concatenation and `str.tostring()`
- Max ~500 labels; garbage collection on overflow
- Callable from `if`/loops
- `yloc.abovebar`, `yloc.belowbar`, `yloc.price`
- Update existing: `label.set_xy()`, `label.set_text()`

## Choosing the right tool

| Need | Use |
|------|-----|
| Simple marker on bars | `plotshape` / `plotchar` |
| Dynamic price in text | `label.new()` |
| Fixed HUD text | `table` |
| Unicode symbols | any (plotchar limited to 1 char) |

## Codegen rules

- `plotchar`/`plotshape` first arg is series bool for conditional display
- Convert series values: `str.tostring(value, format.mintick)`
- Use `label.style_none` for text-only labels
- Set `max_labels_count` in declaration for heavy label use
- Tables for text that must not scroll with bars
