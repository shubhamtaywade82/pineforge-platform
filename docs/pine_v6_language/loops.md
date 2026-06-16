# Language: Loops

Source: https://www.tradingview.com/pine-script-docs/language/loops/

## Loop types

| Type | Control | Use when |
|------|---------|----------|
| `for` | Counter `from` → `to` `[by step]` | Known iteration count |
| `while` | `bool` condition | Unknown boundaries |
| `for...in` | Collection contents | Arrays, matrices, maps |

## When loops are unnecessary

Pine already executes once per bar. Prefer:

- `close[n]` history referencing
- `var` / `varip` for persistent state
- `ta.*` built-ins instead of manual summation loops

```pine
// Bad — loop for SMA
for i = 0 to length - 1
    closeSum += close[i]

// Good
avgClose = ta.sma(close, length)
```

## When loops are necessary

- Iterating/manipulating collections
- Comparing current bar value against past bars (value only known on current bar)
- Tasks with no loop-free built-in equivalent

## Common syntax

```pine
[vars = | :=] loop_header
    statements | continue | break
    return_expression
```

- Loop body: 4-space indent (local scope)
- Variables declared in loop header/body are local only
- Loops return last evaluated expression; assign with `result = for ...`
- `continue` — skip rest of iteration
- `break` — exit loop immediately

## for loop

```pine
for i = 0 to 10
    label.new(bar_index + i, 0, str.tostring(i))

for i = lookbackInput to 1  // downward count
    label.new(bar_index - i, high[i], "")

for i = 0 to array.size(a) - 1
    element = array.get(a, i)
```

`to_num` is re-evaluated each iteration (dynamic bounds possible).

## while loop

```pine
int j = 0
while j <= 10
    label.new(bar_index + j, 0, str.tostring(j))
    j += 1
```

Must update counter/condition inside body to avoid infinite loops.

## for...in loop

```pine
for price in myArray
    strength += price > close ? -1 : 1

for [index, element] in myArray
    labelText += str.tostring(index) + ": " + element + "\n"

for [key, value] in myMap
    tableText += str.tostring(key) + ": " + str.tostring(value)
```

| Collection | Iteration |
|------------|-----------|
| `array` | Elements (or `[index, element]`) |
| `matrix` | Row arrays |
| `map` | `[key, value]` pairs (required form) |

## Codegen rules

- Prefer `for...in` over index loops for arrays
- Guard empty arrays: `for i = 0 to (array.size(a) == 0 ? na : array.size(a) - 1)` — `na` `to` skips loop
- Set `max_labels_count` / `max_lines_count` when loops create drawings
- Use `barstate.islast` / `barstate.islastconfirmedhistory` to limit drawing loops
