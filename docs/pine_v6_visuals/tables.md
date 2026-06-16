# Visuals: Tables

Source: https://www.tradingview.com/pine-script-docs/visuals/tables/

## Basics

- Fixed position HUD — does **not** move with chart scroll/zoom
- Anchored to one of nine `position.*` references
- Two steps: `table.new()` then `table.cell()` per cell
- Shows last state from final bar execution

## Create and populate

```pine
var table atrDisplay = table.new(position.top_right, 1, 1, bgcolor = color.gray)

myAtr = ta.atr(14)  // calculate every bar

if barstate.islast
    table.cell(atrDisplay, 0, 0, str.tostring(myAtr, format.mintick), text_color = color.white)
```

## Position anchors

`position.top_left`, `top_center`, `top_right`, `middle_left`, `middle_center`, `middle_right`, `bottom_left`, `bottom_center`, `bottom_right`

## Cell sizing

- Auto mode: width/height from content
- Explicit: `width = 100, height = 100` as % of pane space

## Management

```pine
table.set_position(id, position.top_left)
table.cell_set_text(id, col, row, "new text")
table.merge_cells(id, start_col, start_row, end_col, end_row)
table.clear(id)
table.delete(id)
```

Each `table.cell()` call **redefines all** cell properties.

## Patterns

**Dashboard panel:**

```pine
var table panel = table.new(position.top_right, 2, rowCount + 1)
if barstate.islast
    table.cell(panel, 0, 0, "MA", bgcolor = headerColor)
    for i = 1 to rowCount
        table.cell(panel, 1, i, str.tostring(ma, format.mintick), bgcolor = cellColor)
```

**Full-pane background tint:**

```pine
var table bgTable = table.new(position.middle_center, 1, 1)
if barstate.islast
    table.cell(bgTable, 0, 0, width = 100, height = 100, bgcolor = bgColor)
```

**Heatmap (no text):**

```pine
if barstate.islast
    var heatmap = table.new(position.bottom_center, lookBack, 1)
    for i = 1 to lookBack
        table.cell(heatmap, lookBack - i, 0, bgcolor = color.new(bullColor, transp))
```

## Codegen rules

- Always `var table` for creation
- Populate on `barstate.islast` or `barstate.isfirst` only
- Calculate series (`ta.*`) **outside** the `if barstate.islast` block
- Strategies without `calc_on_every_tick = true` won't update tables on realtime ticks
- Max total cells across all tables is platform-limited
