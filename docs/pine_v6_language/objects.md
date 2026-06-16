# Language: Objects

Source: https://www.tradingview.com/pine-script-docs/language/objects/

## Concept

Objects are instances of user-defined types (UDTs) — like methodless classes with named fields.

## Define a UDT

```pine
type pivotPoint
    int x
    float y
    string xloc = xloc.bar_time
```

- `type` keyword + name
- Indented fields with optional defaults
- Cannot use `int`, `float`, `string`, `bool`, `color` as UDT names
- UDT names shadow built-in namespaces (except fundamental types)

## Create objects

```pine
foundPoint = pivotPoint.new()
foundPoint = pivotPoint.new(time, high)
foundPoint = pivotPoint.new(x = time, y = high)

pivotPoint foundPoint = na  // placeholder
```

## Modify fields

```pine
foundPoint.x := time[legsInput]
foundPoint.y := pivotHighPrice
```

## var with objects

`var` on object variable persists the object; fields persist too:

```pine
var BarInfo firstBar = BarInfo.new()
```

For tick-level field persistence on realtime bar, use `varip` **on each field** in the type:

```pine
type Counter
    int bars = 0
    varip int ticks = 0
```

## Collections of objects

```pine
var array<pivotPoint> pivotHighArray = array.new<pivotPoint>()
array.push(pivotHighArray, pivotPoint.new(time[legsInput], pivotHighPrice))

for eachPivot in pivotHighArray
    label.new(eachPivot.x, eachPivot.y, str.tostring(eachPivot.y))
```

## Copy semantics

Assignment is by reference:

```pine
pivot2 = pivot1
pivot2.x := 2000  // also changes pivot1.x
```

Shallow copy:

```pine
pivot2 = pivotPoint.copy(pivot1)
```

Shallow copy shares nested reference-type fields (label, line, nested UDT). Deep copy requires copying each reference field explicitly.

## Codegen patterns

- Use UDTs to group related state (pivot time + price + xloc)
- Store object collections in `array<UDT>` for historical pivot/level tracking
- Use `barstate.islastconfirmedhistory` when drawing from collected objects
- Call `.copy()` when independent object instances are required
