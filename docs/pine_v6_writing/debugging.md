# Writing: Debugging

Source: https://www.tradingview.com/pine-script-docs/writing/debugging/

## Debug output options

| Tool | Best for | Scope |
|------|----------|-------|
| `log.*()` | Primary — text, any scope | Pine Logs pane |
| `label.new()` | Dynamic text on chart | Local + global |
| `plot()` / `plotchar()` | Numeric series, Data Window | Global only |
| `bgcolor()` / `barcolor()` | Conditions, colors | Global only |
| `table` | Fixed debug HUD | Local + global |

## Pine Logs (preferred)

```pine
log.info("value: " + str.tostring(myVar))
log.warning("unconfirmed: {0}", value)
log.error("Division by zero on bar {0}", bar_index)
```

- Works in global and local scopes
- Levels: `info` (gray), `warning` (orange), `error` (red)
- Historical: one log per call per bar
- Realtime: logs every tick (not rolled back)
- Max ~10,000 historical logs in pane

```pine
if barstate.isconfirmed
    log.info("confirmed value: {0}", close)
else
    log.warning("unconfirmed: {0}", close)
```

Access: Pine Editor → More → Pine Logs.

## Plots for debugging

```pine
plot(bar_index, "bar_index", color.teal, 3)  // all display locations
plotchar(bar_index, "Bar index", "", location.top)  // Data Window only
```

Use `location.top` to avoid affecting scale.

## Labels for debugging

```pine
if barstate.islastconfirmedhistory
    label.new(bar_index, high,
        "High = " + str.tostring(high, format.mintick),
        yloc = yloc.abovebar, style = label.style_none)
```

- Dynamic text via `str.tostring()` + concatenation
- Use `tooltip` instead of `text` to reduce clutter
- Subject to drawing limits (~500 labels)

## Limitations

- Cannot debug `request.*()` expressions that depend on drawings
- Drawings have no "scroll to bar" — manual chart navigation
- `plotshape`/`plotchar` text is const only

## Codegen rules

- Prefer `log.info()` over comment-style debugging
- Guard realtime spam with `barstate.isconfirmed`
- Use `str.format()` for structured multi-field logs
- Remove or gate debug output in production scripts via input flag
