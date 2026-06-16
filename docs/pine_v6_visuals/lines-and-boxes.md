# Visuals: Lines and Boxes

Source: https://www.tradingview.com/pine-script-docs/visuals/lines-and-boxes/

## Drawing types

| Type | Namespace | Default limit |
|------|-----------|---------------|
| `line` | `line.*` | ~50 (max 500) |
| `box` | `box.*` | ~50 (max 500) |
| `polyline` | `polyline.*` | ~50 (max 100) |

Set limits in declaration: `max_lines_count = 500`, `max_boxes_count = 500`, `max_polylines_count = 100`.

## line.new()

```pine
line.new(firstPoint, secondPoint, xloc, extend, color, style, width, force_overlay)
line.new(x1, y1, x2, y2, ...)
```

- `xloc.bar_index` (default) or `xloc.bar_time`
- `extend`: `extend.left`, `extend.right`, `extend.both`, `extend.none`
- Min bar index offset: `bar_index - 10000` (use `xloc.bar_time` for larger)
- Garbage collection deletes oldest when over limit

```pine
firstPoint = chart.point.from_index(bar_index - 1, hl2[1])
secondPoint = chart.point.from_index(bar_index + 1, price)
line.new(firstPoint, secondPoint, color = color.aqua, width = 2)
```

## box.new()

```pine
box.new(topLeft, bottomRight, border_color, border_width, border_style, extend, xloc, bgcolor, text, ...)
```

- `bgcolor` fills interior
- Can extend left/right like lines

## polyline.new()

```pine
polyline.new(points, curved, closed, line_color, fill_color, ...)
```

- Connects multiple `chart.point` values
- `closed = true` + `fill_color` for filled shapes

## Management

```pine
line.set_xy1(id, x, y)
line.set_extend(id, extend.right)
line.delete(oldLine)
line.all  // array of all line IDs
box.copy(id)
```

Methods and namespace functions are equivalent: `id.set_x(x)` ≡ `line.set_x(id, x)`.

## Local scope

Unlike plots, drawings can be created inside `if`, loops, and functions:

```pine
if barstate.islastconfirmedhistory
    for i = 1 to lengthInput
        if high[i] > high
            label.new(bar_index - i, na, "", ...)
```

## Codegen rules

- Use `var` + update (`line.set_*`) instead of recreating every bar when possible
- Draw on `barstate.islast` / `barstate.islastconfirmedhistory` for performance
- Realtime bars redraw until confirmed — expect updates on open bar
- Use `chart.point.now()` / `chart.point.from_index()` for coordinates
- Pair with `linefill.new()` for channel fills
