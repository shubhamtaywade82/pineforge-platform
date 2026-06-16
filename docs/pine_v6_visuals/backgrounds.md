# Visuals: Backgrounds

Source: https://www.tradingview.com/pine-script-docs/visuals/backgrounds/

## bgcolor()

```pine
bgcolor(color, offset, editable, show_last, title, force_overlay) → void
```

- Colors the script's visual space background
- With `overlay = true`, colors the **chart** background
- `color` accepts **series color** (dynamic per bar)
- Returns `void` — side effect only

## Patterns

**Session coloring:**

```pine
sessionColor = switch
    time(timeframe.period, "0400-0930") != 0 => preMarketColor
    time(timeframe.period, "0930-1600") != 0 => regSessionColor
    time(timeframe.period, "1600-2000") => postMarketColor
    => color(na)

bgcolor(sessionColor)
```

**Gradient background:**

```pine
backgroundColor = if myCCIPosition >= 50
    color.from_gradient(myCCIPosition, 50, 100, color.new(bullColor, 75), bullColor)
else
    color.from_gradient(myCCIPosition, 0, 50, bearColor, color.new(bearColor, 75))

bgcolor(backgroundColor)
```

## Transparency

Use `color.new(base, transparency)` or hex alpha (`#RRGGBBAA`).

Pine transparency: 0 = opaque, 100 = invisible.

## Codegen rules

- Use `color(na)` or `na` color to skip coloring a bar
- Pane indicators can color **chart bars** via `barcolor()` but backgrounds color their own pane
- Combine with `force_overlay = true` to tint main chart from a pane script
- Test on light and dark themes; avoid pure black/white
