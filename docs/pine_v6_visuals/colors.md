# Visuals: Colors

Source: https://www.tradingview.com/pine-script-docs/visuals/colors/

## Color model

RGBA: red/green/blue (0–255) + transparency (0–100).

- 0 transparency = opaque
- 100 transparency = invisible

## Built-in constants

`color.green`, `color.red`, `color.blue`, `color.lime`, `color.orange`, `color.gray`, `color.white`, etc.

## Defining colors

```pine
#80800099                    // hex with alpha
color.new(color.olive, 40)   // 40% transparent
color.rgb(128, 128, 0, 40)
color(na)                    // no color
```

## Dynamic colors

**Conditional:**

```pine
maColor = ta.rising(ma, 1) ? color.green : color.maroon
plot(ma, color = maColor)

// Hide on specific bars
plot(pHi, color = ta.change(pHi) != 0 ? na : color.olive)
```

**Gradient:**

```pine
signalColor = color.from_gradient(signal, -200, 200, bearColor, bullColor)
```

**Component access:** `color.r()`, `color.g()`, `color.b()`, `color.t()`

## Style tab color pickers

Auto color pickers appear when all plot colors are `const`.

Wrapping a series condition in one `color.new()` call → `series color` → **no pickers**.

Fix: wrap each base color separately:

```pine
plotColor = close > open ? color.new(color.teal, 50) : color.new(color.red, 50)
```

## Codegen rules

- Use `color.new()` for transparency on overlays/fills
- Cap transparency (e.g. max 80–90) so visuals remain visible
- Test light + dark themes
- Use zero transparency for crisp primary lines
- Status line / price scale always show colors at 0% transparency
