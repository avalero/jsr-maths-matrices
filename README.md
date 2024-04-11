# Matrix Operations Library

This library provides basic operations for handling and manipulating matrices in TypeScript. It includes a `Matrix` class for creating matrix objects and functions for adding matrices.

## Modules

### Matrix
The `Matrix` class represents a matrix with a number of rows and columns. It allows you to perform various operations on the matrix data, such as getting and setting values, as well as retrieving its dimensions.

#### Constructor
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
```

#### Methods
- `data()`: Returns the matrix data.
- `rows()`: Returns the number of rows.
- `cols()`: Returns the number of columns.
- `get(row, col)`: Returns the value at the specified row and column.
- `set(row, col, value)`: Sets the value at the specified row and column.
- `clone()`: Returns a clone of the matrix.

### Add
Functions to add two or more matrices.

#### Functions
- `add(a: Matrix, b: Matrix)`: Adds two matrices.
  ```typescript
  const result = add(matrix1, matrix2);
  ```
- `addMany(matrices: Matrix[])`: Adds an array of matrices.
  ```typescript
  const result = addMany([matrix1, matrix2, matrix3]);
  ```


## Examples

### Creating a Matrix and Accessing its Data

```typescript
import { Matrix } from './path/to/matrix-operations';

const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.data());  // Output: [1, 2, 3, 4]
```

### Adding Two Matrices

```typescript
import { Matrix, add } from './path/to/matrix-operations';

const matrix1 = new Matrix([1, 2, 3, 4], 2, 2);
const matrix2 = new Matrix([1, 2, 3, 4], 2, 2);
const sumMatrix = add(matrix1, matrix2);
console.log(sumMatrix.data());  // Output: [2, 4, 6, 8]
```

### Adding Multiple Matrices

```typescript
import { Matrix, addMany } from './path/to/matrix-operations';

const matrix1 = new Matrix([1, 2, 3, 4], 2, 2);
const matrix2 = new Matrix([1, 2, 3, 4], 2, 2);
const matrix3 = new Matrix([1, 2, 3, 4], 2, 2);
const totalSum = addMany([matrix1, matrix2, matrix3]);
console.log(totalSum.data());  // Output: [3, 6, 9, 12]
```

