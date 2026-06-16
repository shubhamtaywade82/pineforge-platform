# Writing: Profiling and Optimization

Source: https://www.tradingview.com/pine-script-docs/writing/profiling-and-optimization/

## Pine Profiler

Enable: Pine Editor → More → Profiler mode (v6 scripts only).

Shows runtime % per significant line/block. Flame icons mark top 3 hotspots.

**Not profiled:** declaration statements, type defs, unused code, trivial declarations.

## Interpreting results

| Region | Tooltip shows |
|--------|---------------|
| Single line | Line time, execution count |
| if/for/while block | Total block time + line time for header |
| Function body | Combined time from all calls |
| `request.*()` in functions | Request time may appear outside function scope |

Split complex ternary/switch into nested `if` for granular profiling.

## Optimization techniques

### 1. Use built-ins

Replace manual loops with `ta.*` functions:

```pine
// Bad
for i = 0 to length - 1
    result := math.max(result, source[i])

// Good
result = ta.highest(source, length)
```

### 2. Reduce repetition

Cache expensive calls used multiple times:

```pine
int count = data.valuesAbove(99)
color plotColor = switch
    count <= 10 => color.new(color.purple, 90)
    count <= 20 => color.new(color.purple, 80)
    // ...
plot(count, color = plotColor)
```

Compiler auto-dedupes identical expressions — manual cache still helps when args differ.

### 3. Minimize request.*() calls

```pine
// Bad — 9 separate calls
r1 = request.security(sym, tf, ta.percentrank(close, 10))
r2 = request.security(sym, tf, ta.percentrank(close, 20))

// Good — one tuple request
[r1, r2, ...] = request.security(sym, tf, [
    ta.percentrank(close, 10),
    ta.percentrank(close, 20)
])
```

Also: use UDT for >127 tuple elements; set `calc_bars_count` to limit history.

### 4. Avoid redrawing

```pine
// Bad
box.delete(b)
b := box.new(x1, y1, x2, y2)

// Good
box.set_lefttop(b, x1, y1)
box.set_rightbottom(b, x2, y2)
```

### 5. Reduce drawing updates

Users never see historical drawing evolution — only final state matters.

```pine
if barstate.islast  // not every bar
    table.cell_set_text(t, 0, 0, str.tostring(value))
```

### 6. Avoid unnecessary loops

Prefer `ta.sma()` over manual summation loops (see execution model).

## Unused code

Compiler strips code not reachable from outputs. Dead calculations have zero cost.

## Codegen rules

- Prefer `ta.*` over reimplementing indicators
- One `request.security()` per symbol/timeframe with tuple/UDT
- Update drawings with setters; create on `barstate.isfirst` or `islast`
- Assign repeated expensive calls to a variable once
