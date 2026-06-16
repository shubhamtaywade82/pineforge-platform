# Pine Script v6 Rules (Distilled)

## Version and Declaration

- First line MUST be `//@version=6`
- Use `indicator()`, `strategy()`, or `library()` — never `study()`
- One declaration per script

## Multi-Timeframe

- Use `request.security(symbol, timeframe, expression)` — never bare `security()`
- Prefer `gaps=barmerge.gaps_off` and `lookahead=barmerge.lookahead_off` for non-repainting

## Colors and Transparency

- Use `color.new(base_color, transparency)` where transparency is 0–100
- Never use deprecated `transp:` parameter or `.transp` property

## Arrays

- Use typed constructors: `array.new<float>()`, `array.new<int>()`, `array.new<string>()`
- Never use deprecated `array.new_float()` style names

## Strategies

- `strategy.entry(id, direction)` opens positions
- `strategy.close(id)` closes by id
- `strategy.exit(id, from_entry=..., profit=..., loss=...)` for TP/SL

## Inputs

- `input.int()`, `input.float()`, `input.bool()`, `input.color()`, `input.source()`, `input.string()`, `input.timeframe()`

## Plotting

- `plot(series, title=..., color=...)`
- `plotshape(condition, ...)`, `bgcolor(color)`, `hline(price, ...)`

## Common Builtins

- `ta.sma`, `ta.ema`, `ta.rsi`, `ta.macd`, `ta.atr`, `ta.crossover`, `ta.crossunder`
- `math.max`, `math.min`, `math.abs`, `math.round`
