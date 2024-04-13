import {
  assertAlmostEquals,
  assertEquals,
  assertThrows,
} from "jsr:@std/assert";
import { Matrix } from "../matrix.ts";
import { multiply } from "../multiply.ts";

Deno.test("Matrix constructor", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix["_data"], data);
  assertEquals(matrix["_rows"], rows);
  assertEquals(matrix["_cols"], cols);
});

Deno.test(
  "Matrix constructor throws error when dimensions are not valid",
  () => {
    const data = [1, 2, 3, 4];
    const rows = 2;
    const cols = 3;
    assertThrows(
      () => new Matrix(data, rows, cols),
      Error,
      "Invalid matrix dimensions"
    );
  }
);

Deno.test("Matrix data method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix.data, data);
});

Deno.test("Matrix rows method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix.rows, rows);
});

Deno.test("Matrix cols method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix.cols, cols);
});

Deno.test("Matrix get method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix.get(1, 1), 4);
});

Deno.test("Matrix get method throws error when row is invalid", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertThrows(() => matrix.get(3, 1), Error, "Invalid row or column");
});

Deno.test("Matrix get method throws error when column is invalid", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertThrows(() => matrix.get(1, 3), Error, "Invalid row or column");
});

Deno.test("Matrix set method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  matrix.set(1, 1, 5);
  assertEquals(matrix.data, [1, 2, 3, 5]);
});

Deno.test("Matrix set method throws error when row is invalid", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertThrows(() => matrix.set(3, 1, 5), Error, "Invalid row or column");
});

Deno.test("Matrix set method throws error when column is invalid", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertThrows(() => matrix.set(1, 3, 5), Error, "Invalid row or column");
});

Deno.test("Matrix set method throws error when value is invalid", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertThrows(() => matrix.set(1, 1, NaN), Error, "Invalid value");
});

Deno.test("Matrix set method throws error when value is invalid", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertThrows(() => matrix.set(1, 1, NaN), Error, "Invalid value");
});

Deno.test("Matrix 2x2 determinant method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix.determinant(), -2);
});

// detrminant of bigger matrix
Deno.test("Matrix 3x3 determinant method", () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rows = 3;
  const cols = 3;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix.determinant(), 0);
});

// determinant of 4x4 matrix , result must be different from 0
Deno.test("Matrix 4x4 determinant method", () => {
  const data = [3, 2, 3, 4, 5, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const rows = 4;
  const cols = 4;
  const matrix = new Matrix(data, rows, cols);
  assertEquals(matrix.determinant(), 8);
});

Deno.test(
  "Matrix determinant method throws error when matrix is not square",
  () => {
    const data = [1, 2, 3, 4, 5, 6];
    const rows = 2;
    const cols = 3;
    const matrix = new Matrix(data, rows, cols);
    assertThrows(() => matrix.determinant(), Error, "Matrix must be square");
  }
);

Deno.test("Matrix: minor method", () => {
  const matrix = new Matrix([1, 2, 3, 4], 2, 2);
  const expectedMinor = new Matrix([4], 1, 1);
  const minor = matrix.minor(0, 0);
  assertEquals(minor.data, expectedMinor.data);
  assertEquals(minor.rows, 1);
  assertEquals(minor.cols, 1);
});

Deno.test("Matrix: minor method for larger matrix", () => {
  const matrix = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 3);
  const expectedMinor = new Matrix([5, 6, 8, 9], 2, 2);
  const minor = matrix.minor(0, 0);
  assertEquals(minor.data, expectedMinor.data);
  assertEquals(minor.rows, 2);
  assertEquals(minor.cols, 2);
});

Deno.test("Matrix: cofactor method", () => {
  const matrix = new Matrix([1, 2, 3, 4], 2, 2);
  // Cofactor of the element at (0, 0): minor determinant is 4, sign factor is +1
  const cofactor = matrix["cofactor"](0, 0); // Using private method, might need to expose or modify access for testing
  assertEquals(cofactor, 4);
});

// test transpose and gettranspose methods
Deno.test("Matrix getTranspose method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  const transpose = matrix.getTranspose();
  assertEquals(transpose.data, [1, 3, 2, 4]);
  assertEquals(matrix.data, data);
});

Deno.test("Matrix getTranspose method", () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rows = 3;
  const cols = 3;
  const matrix = new Matrix(data, rows, cols);
  const transpose = matrix.getTranspose();
  assertEquals(transpose.data, [1, 4, 7, 2, 5, 8, 3, 6, 9]);
});

// test transpose method
Deno.test("Matrix transpose method", () => {
  const data = [1, 2, 3, 4];
  const rows = 2;
  const cols = 2;
  const matrix = new Matrix(data, rows, cols);
  matrix.transpose();
  assertEquals(matrix.data, [1, 3, 2, 4]);
});

Deno.test("Matrix transpose method", () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rows = 3;
  const cols = 3;
  const matrix = new Matrix(data, rows, cols);
  matrix.transpose();
  assertEquals(matrix.data, [1, 4, 7, 2, 5, 8, 3, 6, 9]);
});

Deno.test("Matrix: validate minor matrix content", () => {
  const matrix = new Matrix([1, 2, 3, 4], 2, 2);
  const expectedMinor = new Matrix([4], 1, 1); // Minor of element (0,0) is just the bottom-right element
  const minor = matrix.minor(0, 0);
  console.log(minor.data);
  assertEquals(minor.data, expectedMinor.data);
});

Deno.test("Matrix: cofactor method detailed check", () => {
  const matrix = new Matrix([1, 2, 3, 4], 2, 2);
  matrix.minor(0, 0).data.forEach((value, index) => {
    console.log(`Value at index ${index}: ${value}`); // Should log the values in the minor matrix
  });
  const cofactor = matrix["cofactor"](0, 0);
  assertEquals(cofactor, 4); // If the minor determinant is 4, and sign is +1
});

// invert and getinverse

Deno.test("Matrix invert - Square and Invertible Matrix", () => {
  const matrix = new Matrix([4, 7, 2, 6], 2, 2); // A 2x2 invertible matrix
  matrix.invert(); // Perform in-place inversion
  const expectedOutput = new Matrix([0.6, -0.7, -0.2, 0.4], 2, 2); // Corrected expected inverse matrix
  assertEquals(matrix.data, expectedOutput.data);
});

Deno.test("Matrix getInverse - Square and Invertible Matrix", () => {
  const matrix = new Matrix([4, 7, 2, 6], 2, 2);
  const inverseMatrix = matrix.getInverse();
  const expectedOutput = new Matrix([0.6, -0.7, -0.2, 0.4], 2, 2);
  assertEquals(inverseMatrix.data, expectedOutput.data);
});

Deno.test("Matrix invert - Non-square Matrix", () => {
  const matrix = new Matrix([1, 2, 3, 4, 5, 6], 2, 3); // A 2x3 non-square matrix
  assertThrows(
    () => {
      matrix.invert();
    },
    Error,
    "Matrix must be square"
  );
});

Deno.test("Matrix getInverse - Non-square Matrix", () => {
  const matrix = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
  assertThrows(
    () => {
      matrix.getInverse();
    },
    Error,
    "Matrix must be square"
  );
});

Deno.test("Matrix invert - Non-invertible Square Matrix", () => {
  const matrix = new Matrix([2, 4, 1, 2], 2, 2); // A 2x2 non-invertible matrix (det = 0)
  assertThrows(
    () => {
      matrix.invert();
    },
    Error,
    "Matrix is not invertible"
  );
});

Deno.test("Matrix getInverse - Non-invertible Square Matrix", () => {
  const matrix = new Matrix([2, 4, 1, 2], 2, 2);
  assertThrows(
    () => {
      matrix.getInverse();
    },
    Error,
    "Matrix is not invertible"
  );
});

// Test identity matrix properties
Deno.test("Matrix identity matrix properties", () => {
  const size = 3; // Consider testing other sizes
  const identityData = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const identityMatrix = new Matrix(identityData, size, size);
  const inverseMatrix = identityMatrix.getInverse();
  assertEquals(
    identityMatrix.data,
    inverseMatrix.data,
    "An identity matrix should be its own inverse."
  );
  assertEquals(
    identityMatrix.determinant(),
    1,
    "The determinant of an identity matrix should be 1."
  );
});

// Test for matrix transposition properties
Deno.test("Matrix transpose properties", () => {
  const matrix = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 3);
  const transposed = matrix.getTranspose();
  const reTransposed = transposed.getTranspose();
  assertEquals(
    reTransposed.data,
    matrix.data,
    "Transposing a matrix twice should yield the original matrix."
  );
});

// Test matrix multiplication with its inverse
Deno.test("Matrix multiplication with inverse", () => {
  const matrix = new Matrix([4, 7, 2, 6], 2, 2);
  const inverseMatrix = matrix.getInverse();
  const product = multiply(matrix, inverseMatrix);
  const expectedIdentity = new Matrix([1, 0, 0, 1], 2, 2);
  for (let i = 0; i < product.data.length; i++) {
    assertAlmostEquals(product.data[i], expectedIdentity.data[i], 10e-10);
  }
});

// Testing diagonal matrix properties
Deno.test("Diagonal matrix properties", () => {
  const diagonal = new Matrix([1, 0, 0, 2], 2, 2);
  assertEquals(
    diagonal.determinant(),
    2,
    "The determinant of a diagonal matrix should be the product of its diagonal elements."
  );
  const inverseDiagonal = diagonal.getInverse();
  const expectedInverse = new Matrix([1, 0, 0, 0.5], 2, 2);
  assertEquals(
    inverseDiagonal.data,
    expectedInverse.data,
    "The inverse of a diagonal matrix should be the reciprocal of its diagonal elements."
  );
});

// Test error handling for operations on non-square matrices
Deno.test("Non-square matrix operations", () => {
  const matrix = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
  assertThrows(
    () => {
      matrix.determinant();
    },
    Error,
    "Matrix must be square"
  );
  assertThrows(
    () => {
      matrix.getInverse();
    },
    Error,
    "Matrix must be square"
  );
});

// Test symmetry properties (symmetric matrix should equal its transpose)
Deno.test("Symmetric matrix properties", () => {
  const symmetricData = [1, 2, 2, 3];
  const symmetricMatrix = new Matrix(symmetricData, 2, 2);
  const transpose = symmetricMatrix.getTranspose();
  assertEquals(
    symmetricMatrix.data,
    transpose.data,
    "A symmetric matrix should be equal to its transpose."
  );
});

// Ensure robust error handling for invalid inputs
Deno.test("Invalid value error handling", () => {
  const matrix = new Matrix([1, 2, 3, 4], 2, 2);
  assertThrows(
    () => {
      matrix.set(1, 1, NaN);
    },
    Error,
    "Invalid value"
  );
});