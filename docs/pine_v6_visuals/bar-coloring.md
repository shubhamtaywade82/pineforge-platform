# Visuals: Bar Coloring

Source: https://www.tradingview.com/pine-script-docs/visuals/bar-coloring/

## barcolor()

```pine
barcolor(color, offset, editable, show_last, title, display) → void
```

- Colors bars on the **main chart** regardless of script pane
- `color` accepts **series color** (conditional coloring)
- `na` leaves bars unchanged

## Example

```pine
isInside = high < high[1] and low > low[1]
isOutsideUp = high > high[1] and low < low[1] and close > open
isOutsideDown = high > high[1] and low < low[1] and close <= open

barcolor(
    isInside ? color.yellow :
    isOutsideUp ? color.aqua :
    isOutsideDown ? color.purple : na)
```

## Codegen rules

- Only affects main chart candles/bars
- Use ternary or `switch` for multi-state coloring
- Pair with `overlay = false` pane indicators when needed
- `display` parameter controls visibility like other plot visuals
