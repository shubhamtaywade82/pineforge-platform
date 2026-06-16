# Language: Matrices

Source: https://www.tradingview.com/pine-script-docs/language/matrices/

## Basics

- Two-dimensional collections (rows × columns)
- Homogeneous element type
- Indices: `row` and `column`, both start at 0
- Max 100,000 elements (rows × columns)
- Dynamic row/column counts

## Declaration

```pine
matrix<float> myMatrix = na
myMatrix = matrix.new<float>(2, 2, 0.0)

var matrix<int> m = matrix.new<int>(1, 2, 0)
```

## Read / write

```pine
m.set(0, 0, m.get(0, 0) + 1.0)
m.fill(math.random())
m.rows()
m.columns()
```

## Rows and columns

```pine
array row0 = m.row(0)      // copy — modifying row does not change matrix
array col0 = m.col(0)

m.add_row(0, array.from(1, 2, 3))
m.add_col(3, array.from(4, 8, 12))
m.remove_row(0)
m.remove_col(3)
m.swap_rows(0, 2)
m.swap_columns(0, 1)
```

For UDT/reference types, `row()`/`col()` are shallow copies — elements share object references.

## Reshape / build

```pine
taMatrix = matrix.new<float>()
taMatrix.add_row(0, array.from(rsi10, rsi20, rsi50, mom10, mom20, mom50))
taMatrix.reshape(2, 3)
element = taMatrix.get(i, j)
```

## Looping

```pine
for row = 0 to m.rows() - 1
    for col = 0 to m.columns() - 1
        val = m.get(row, col)

for rowArray in m
    for element in rowArray
        ...
```

`for...in` on matrix iterates **rows** as arrays.

## Linear algebra

Matrix namespace includes: `matrix.mult()`, `matrix.transpose()`, `matrix.det()`, `matrix.inv()`, `matrix.eigenvalues()`, etc.

## Codegen rules

- Use matrices for 2D tables (indicator grids, correlation matrices)
- Prefer `for...in` for row-wise iteration
- Remember `row()`/`col()` return copies for primitives but shallow refs for objects
- Use `var matrix` for persistent state across bars
