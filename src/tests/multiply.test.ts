import { assertEquals, assertThrows } from "jsr:@std/assert";
import { Matrix } from "../matrix.ts";
import { multiply, multiplyMany } from "../multiply.ts";

// Test basic matrix multiplication
Deno.test("Matrix multiplication", () => {
  const a = new Matrix([1, 2, 3, 4], 2, 2);
  const b = new Matrix([2, 0, 1, 2], 2, 2);
  const product = multiply(a, b);
  assertEquals(product.data, [4, 4, 10, 8]);
  assertEquals(product.rows, 2);
  assertEquals(product.cols, 2);
});

// Test multiplication with non-square matrices
Deno.test("Matrix multiplication with non-square matrices", () => {
  const a = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
  const b = new Matrix([1, 2, 3, 4, 5, 6], 3, 2);
  const product = multiply(a, b);
  assertEquals(product.data, [22, 28, 49, 64]);
  assertEquals(product.rows, 2);
  assertEquals(product.cols, 2);
});

// Test multiplication error handling for incompatible matrices
Deno.test("Matrix multiplication error for incompatible matrices", () => {
  const a = new Matrix([1, 2, 3], 1, 3);
  const b = new Matrix([1, 2], 2, 1);
  assertThrows(
    () => multiply(a, b),
    Error,
    "Number of columns of the first matrix must be the same as the number of rows of the second matrix"
  );
});

// Test multiplyMany with multiple matrices
Deno.test("Multiply many matrices", () => {
  const matrices = [
    new Matrix([1, 2, 3, 4], 2, 2),
    new Matrix([2, 0, 1, 2], 2, 2),
    new Matrix([0, 1, 1, 1], 2, 2),
  ];
  const product = multiplyMany(matrices);
  // Corrected expected result based on matrix multiplication
  assertEquals(product.data, [4, 8, 8, 18]);
});

// Test multiplyMany with a single matrix (should return the same matrix)
Deno.test("Multiply many matrices with a single matrix", () => {
  const matrices = [new Matrix([1, 2, 3, 4], 2, 2)];
  const product = multiplyMany(matrices);
  assertEquals(product.data, [1, 2, 3, 4]);
});

// Test multiplyMany error handling for no matrices
Deno.test("Multiply many matrices error for no matrices", () => {
  const matrices: Matrix[] = [];
  assertThrows(
    () => multiplyMany(matrices),
    Error,
    "At least one matrix is required"
  );
});
