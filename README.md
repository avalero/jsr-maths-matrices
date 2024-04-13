# Matrix Module

This module provides functionality for working with matrices, including operations such as creation, manipulation, and computation.

## Class: Matrix

Represents a matrix for linear algebra operations.

### Constructor

```typescript
constructor(data: number[], rows: number, cols: number)
```

Constructs a matrix with the provided data, rows, and columns.

- `data`: Array of numbers representing the matrix elements in row-major order.
- `rows`: Number of rows in the matrix.
- `cols`: Number of columns in the matrix.

Throws an error if the length of data does not equal rows * cols.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2); // Creates a 2x2 matrix
```

### Static Methods

#### createIdentity

```typescript
static createIdentity(size: number): Matrix
```

Creates an identity matrix of the specified size.

- `size`: Size of the identity matrix.

Returns a new identity matrix of the specified size.

Example:
```typescript
const identity = Matrix.createIdentity(3); // Creates a 3x3 identity matrix
```

#### createZero

```typescript
static createZero(rows: number, cols: number): Matrix
```

Creates a matrix of the specified size with all elements set to zero.

- `rows`: Number of rows in the matrix.
- `cols`: Number of columns in the matrix.

Returns a new matrix of the specified size with all elements set to zero.

Example:
```typescript
const zero = Matrix.createZero(2, 3); // Creates a 2x3 matrix of zeros
```

### Properties

#### data

```typescript
get data(): number[]
```

Returns the data of the matrix as a flat array.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.data); // Output: [1, 2, 3, 4]
```

#### rows

```typescript
get rows(): number
```

Returns the number of rows in the matrix.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.rows); // Output: 2
```

#### cols

```typescript
get cols(): number
```

Returns the number of columns in the matrix.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.cols); // Output: 2
```

### Methods

#### get

```typescript
get(row: number, col: number): number
```

Retrieves the element at a specified row and column.

- `row`: Row index of the element.
- `col`: Column index of the element.

Returns the element at the specified position.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.get(0, 1)); // Output: 2
```

#### set

```typescript
set(row: number, col: number, value: number): void
```

Sets the element at a specified row and column to a new value.

- `row`: Row index where the element is located.
- `col`: Column index where the element is located.
- `value`: New value to set at the specified position.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
matrix.set(0, 1, 5);
console.log(matrix.get(0, 1)); // Output: 5
```

#### minor

```typescript
minor(row: number, col: number): Matrix
```

Calculates and returns the minor of a specified element in the matrix.

- `row`: Row index of the element.
- `col`: Column index of the element.

Returns a new matrix which is the minor of the specified element.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.minor(1, 1).data); // Output: [1]
```

#### cofactor

```typescript
cofactor(row: number, col: number): number
```

Calculates and returns the cofactor of a specified element in the matrix.

- `row`: Row index of the element.
- `col`: Column index of the element.

Returns the cofactor of the specified element.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.cofactor(0, 0)); // Output: 4
```

#### determinant

```typescript
determinant(): number
```

Computes the determinant of the matrix.

Returns the determinant of the matrix.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
console.log(matrix.determinant()); // Output: -2
```

#### multiply

```typescript
multiply(scalar: number): Matrix
```

Multiplies the matrix by a scalar value.

- `scalar`: The scalar value to multiply by.

Returns a new matrix that is the result of the multiplication.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
const scaledMatrix = matrix.multiply(2);
console.log(scaledMatrix.data); // Output: [2, 4, 6, 8]
```

#### getTranspose

```typescript
getTranspose(): Matrix
```

Calculates and returns the transpose of the matrix.

Returns a new matrix that is the transpose of this matrix.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
const transposedMatrix = matrix.getTranspose();
console.log(transposedMatrix.data); // Output: [1, 3, 2, 4]
```

#### invert

```typescript
invert(): void
```

Inverts the current matrix if it is square and invertible.

Throws an error if the matrix is not square or is not invertible.

Example:
```typescript
const matrix = new Matrix([4, 7, 2, 6], 2, 2);
matrix.invert();
console.log(matrix.data); // Output: [-0.6, 0.7, 0.2, -0.4] Adjust values as necessary based on actual calculation
```

#### getInverse

```typescript
getInverse(): Matrix
```

Calculates and returns the inverse of the matrix.

Returns a new matrix that is the inverse of this matrix.

Throws an error if the matrix is not square or is not invertible.

Example:
```typescript
const matrix = new Matrix([4, 7, 2, 6], 2, 2);
const inverseMatrix = matrix.getInverse();
console.log(inverseMatrix.data); // Output: [-0.6, 0.7, 0.2, -0.4] Adjust

 values as necessary based on actual calculation
```

#### transpose

```typescript
transpose(): void
```

Transposes the current matrix in-place.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
matrix.transpose();
console.log(matrix.data); // Output: [1, 3, 2, 4]
```

#### clone

```typescript
clone(): Matrix
```

Clones the matrix and returns a new instance with the same data.

Returns a new matrix with the same data as this one.

Example:
```typescript
const matrix = new Matrix([1, 2, 3, 4], 2, 2);
const clonedMatrix = matrix.clone();
console.log(clonedMatrix.data); // Output: [1, 2, 3, 4]
```
