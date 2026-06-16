# Language: Arrays

Source: https://www.tradingview.com/pine-script-docs/language/arrays/

## Basics

- One-dimensional, homogeneous type
- Accessed by ID reference — use `array.get()` / `array.set()`, not `[]` indexing
- Index 0 to `size() - 1`
- Max 100,000 elements total per array
- Dynamic size can change each bar

## Declaration

```pine
array<float> prices = na           // na requires type
prices = array.new<float>(0)
prices = array.new<float>(2, close)
prices = array.from(close > open, high != close)

var array<float> a = array.new<float>(0)  // persists across bars
```

## Read / write

```pine
array.set(fillColors, 0, color.new(FILL_COLOR, 70))
value = array.get(fillColors, 0)
size = array.size(fillColors)
```

## Common operations

| Operation | Function / method |
|-----------|-------------------|
| Append end | `array.push()` / `a.push()` |
| Prepend | `array.unshift()` |
| Insert | `array.insert(id, index, value)` |
| Remove last | `array.pop()` |
| Remove first | `array.shift()` |
| Fill range | `array.fill(value, from, to)` |
| Copy | `array.copy()` |
| Stats | `array.avg()`, `array.min()`, `array.max()`, `array.stdev()` |

## Looping

```pine
for price in a
    labelText += str.tostring(price) + "\n"

for [i, price] in a
    labelText += str.tostring(i) + ": " + str.tostring(price)

for i = 0 to (array.size(a) == 0 ? na : array.size(a) - 1)
    labelText += str.tostring(array.get(a, i))
```

Prefer `for...in` — auto-validates size.

## Scope

Global arrays can be modified from functions (unlike fundamental types):

```pine
var array<float> level = array.new<float>(1, ta.lowest(ohlc4, 50)[10])

nextLevel(val) =>
    newLevel = level.get(0) * val
    level.set(0, newLevel)
    newLevel
```

## History

```pine
previous = a[1]
previousClose = na(previous) ? na : previous.get(0)
```

## Codegen rules

- Use `var array` when accumulating across bars
- Index guard: never access `index >= array.size()`
- `request.security_lower_tf()` returns arrays of intrabar values
- Queue pattern: `push` + `shift` or `unshift` + `pop` for fixed-size windows
- Set `max_labels_count` when loops create drawings from array contents
