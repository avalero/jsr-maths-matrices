import { assertAlmostEquals, assertEquals, assertThrows } from "@std/assert";
import { Matrix } from "../matrix.ts";
import { multiply } from "../multiply.ts";

function determinantByExpansion(data: number[], size: number): number {
  if (size === 1) {
    return data[0];
  }
  if (size === 2) {
    return data[0] * data[3] - data[1] * data[2];
  }

  let det = 0;
  for (let col = 0; col < size; col++) {
    const minor: number[] = [];
    for (let row = 1; row < size; row++) {
      for (let minorCol = 0; minorCol < size; minorCol++) {
        if (minorCol === col) {
          continue;
        }
        minor.push(data[row * size + minorCol]);
      }
    }
    const sign = col % 2 === 0 ? 1 : -1;
    det += sign * data[col] * determinantByExpansion(minor, size - 1);
  }
  return det;
}

function createDiagonallyDominantMatrix(size: number): Matrix {
  const data = new Array(size * size).fill(0);
  for (let row = 0; row < size; row++) {
    let rowSum = 0;
    for (let col = 0; col < size; col++) {
      if (row === col) {
        continue;
      }
      const value = ((row + 1) * (col + 3)) % 7 - 3;
      data[row * size + col] = value;
      rowSum += Math.abs(value);
    }
    data[row * size + row] = rowSum + row + 1;
  }
  return new Matrix(data, size, size);
}

Deno.test("Matrix determinant: triangular matrix known value", () => {
  const matrix = new Matrix(
    [
      2,
      1,
      0,
      0,
      0,
      0,
      3,
      4,
      0,
      0,
      0,
      0,
      -5,
      2,
      0,
      0,
      0,
      0,
      7,
      8,
      0,
      0,
      0,
      0,
      11,
    ],
    5,
    5,
  );

  assertEquals(matrix.determinant(), -2310);
});

Deno.test("Matrix determinant: matches Laplace reference for 4x4", () => {
  const matrix = new Matrix(
    [
      3,
      2,
      -1,
      4,
      2,
      1,
      5,
      7,
      0,
      5,
      2,
      -6,
      -1,
      2,
      3,
      0,
    ],
    4,
    4,
  );

  const expected = determinantByExpansion(matrix.data, 4);
  assertAlmostEquals(matrix.determinant(), expected, 1e-9);
});

Deno.test("Matrix inverse: A * A^-1 is identity within tolerance", () => {
  const matrix = createDiagonallyDominantMatrix(5);
  const inverse = matrix.getInverse();
  const product = multiply(matrix, inverse);

  for (let row = 0; row < product.rows; row++) {
    for (let col = 0; col < product.cols; col++) {
      const expected = row === col ? 1 : 0;
      assertAlmostEquals(product.get(row, col), expected, 1e-9);
    }
  }
});

Deno.test("Matrix inverse/determinant preserve error semantics", () => {
  const singular = new Matrix(
    [
      1,
      2,
      3,
      2,
      4,
      6,
      1,
      0,
      1,
    ],
    3,
    3,
  );
  const nonSquare = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);

  assertThrows(() => singular.getInverse(), Error, "Matrix is not invertible");
  assertThrows(() => nonSquare.determinant(), Error, "Matrix must be square");
});
