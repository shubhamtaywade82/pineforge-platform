# Visuals: Overview

Source: https://www.tradingview.com/pine-script-docs/visuals/overview/

## Two visual families

| Family | Elements | Behavior |
|--------|----------|----------|
| Plot visuals | `plot*()`, `hline()`, `bgcolor()`, `barcolor()`, `fill()` | Serial — one value per bar |
| Drawing visuals | `line`, `box`, `polyline`, `linefill`, `label`, `table` | Objects — arbitrary locations |

## Script-wide settings (`indicator()` / `strategy()`)

| Parameter | Effect |
|-----------|--------|
| `overlay` | `true` = main pane; `false` = separate pane (default) |
| `force_overlay` | Per-element override to main pane |
| `scale` | `scale.none`, `scale.left`, `scale.right` |
| `behind_chart` | `true` (default) = visuals behind bars |
| `explicit_plot_zorder` | Order plot/hline/fill layers by script order |

## Plot visuals — strengths

- Display on every bar (series)
- Show in status line, price scale, Data Window
- `display.*` controls visibility per location
- Export to CSV, alerts, `input.source()`, Pine Screener
- Max **64 plots** per script instance

## Plot limitations

- **Global scope only** — no `plot()` inside `if`, loops, or functions
- Conditional display via `na` series/color values
- `plotshape()` / `plotchar()` text is **const string** only (not dynamic)
- Fixed offset only (not arbitrary bar placement)

## Drawing visuals — strengths

- Arbitrary x/y (including future bars)
- Dynamic text, colors, styles (`series` args)
- Callable from local scopes (if, loops, functions)
- Max ~500 lines/boxes/labels, 100 polylines (configurable via `max_*_count`)

## Drawing limitations

- No status line / price scale / Data Window / export / alerts
- No auto Style-tab color pickers (use inputs)
- Tables anchored to pane position (not bar-linked)
- x-coordinate limit: ~9999 bars back, ~500 forward

## Z-index (bottom → top)

1. Background colors
2. Fills
3. Plots
4. Horizontal levels
5. Linefills
6. Lines
7. Boxes
8. Labels
9. Tables

## Codegen rules

- Use **plots** for continuous series, alerts, exports
- Use **drawings** for levels, labels, boxes, dynamic text
- Use **tables** for fixed HUD panels
- Use `display.none` for hidden plot outputs used in alerts/exports
- Set `max_lines_count`, `max_labels_count` when loops create drawings
