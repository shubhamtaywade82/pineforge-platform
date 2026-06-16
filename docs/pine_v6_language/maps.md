# Language: Maps

Source: https://www.tradingview.com/pine-script-docs/language/maps/

## Basics

- Unordered key-value collections
- Lookup by key, not index
- Keys: fundamental types or enums (not reference types)
- Values: any type including references and UDTs
- Max 50,000 key-value pairs (100,000 elements total)

## Declaration

```pine
map<string, float> myMap = na
myMap = map.new<string, float>()

var colorMap = map.new<string, color>()
```

## Put / get

```pine
data.put("Rising", bar_index)
index = data.get("Difference")  // na if key missing
data.contains("Rising")
```

Replacing a key's value does **not** change insertion order.

## Keys and values

```pine
keys = m.keys()      // array in insertion order
values = m.values()  // array in insertion order
m.size()
m.remove("B")
m.clear()
m.put_all(otherMap)
```

## Looping

```pine
for [key, value] in thisMap
    tableText += str.tostring(key) + ": " + str.tostring(value)
```

Required form for maps — `for key in m.keys()` + `get()` also works but `for...in` is preferred.

## Copy semantics

```pine
mCopy = m.copy()  // shallow — independent map, shared value refs for objects
```

Deep copy: loop and `value.copy()` for reference types.

## Enum keys

```pine
var map<Signal, float> signalCounters = map.new<Signal, float>()
signalCounters.put(Signal.buy, signalCounters.get(Signal.buy) + 1)
```

Enums enable strict key sets; maps accept enum-typed keys.

## Nested collections

Maps cannot store arrays/matrices/maps directly. Wrap in UDT:

```pine
type Wrapper
    map<string, float> data

mapOfMaps = map.new<string, Wrapper>()
```

## History and scope

```pine
previous = globalData[1]
```

Global maps modifiable from functions — useful for multi-length EMA state keyed by period.

## Codegen rules

- Use maps for labeled lookup tables (color by state, counter by signal)
- Initialize insertion order on `barstate.isfirst` if display order matters
- `str.tostring(enumKey)` for enum key display
- Deep-copy reference values when independent instances needed
