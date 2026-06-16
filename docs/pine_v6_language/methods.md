# Language: Methods

Source: https://www.tradingview.com/pine-script-docs/language/methods/

## Built-in methods

Dot notation equivalent to namespace functions:

```pine
array.get(id, index)   ≡   id.get(index)
array.push(id, val)    ≡   id.push(val)
```

Built-in methods exist for: `array`, `matrix`, `map`, `line`, `linefill`, `box`, `polyline`, `label`, `table`, `chart.point`, `footprint`, `volume_row`.

```pine
sourceArray.push(sourceInput)
sourceArray.shift()
sampleMean := sourceArray.avg()
```

## User-defined methods

Same as functions but with `method` keyword and typed first parameter (the object):

```pine
method maintainQueue(array<float> srcArray, float value, bool takeSample = true) =>
    if takeSample
        srcArray.push(value)
        srcArray.shift()
    srcArray

method calcBB(array<float> srcArray, float mult, bool calculate = true) =>
    var float mean = na
    var float dev = na
    if calculate
        mean := srcArray.avg()
        dev := srcArray.stdev() * mult
    [mean, mean + dev, mean - dev]
```

## Chaining

Methods returning the object enable chains:

```pine
[sampleMean, highBand, lowBand] =
    sourceArray.maintainQueue(sourceInput, newSample).calcBB(multiplier, newSample)
```

## Method overloading

Multiple methods with same name, different first-parameter types:

```pine
method getType(int this) => "int"
method getType(float this) => "float"
method getType(string this) => "string"

a.getType()  // compiler picks overload by receiver type
```

Can overload built-in methods (e.g. custom `fill()` on arrays) when signature differs.

## Library export

```pine
export method myMethod(array<float> this, int x) => ...
```

First parameter type is required for all methods.

## Codegen rules

- Prefer `obj.method()` over `namespace.method(obj, ...)` for readability
- First method param is always the receiver — do not pass it again at call site
- Use `//@function` annotations on methods too
- Return `this` (or the object) from mutating methods to enable chaining
