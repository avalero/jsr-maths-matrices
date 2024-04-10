// multiply.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { multiply, multiplyMany } from "../matrix/multiply.ts";

Deno.test("multiply: should multiply two matrices", () => {
  const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
  const b = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
  const expected = { data: [7, 10, 15, 22], rows: 2, cols: 2 };
  assertEquals(multiply(a, b), expected);
});

Deno.test(
  "multiply: should throw an error when the number of columns in the first matrix is not equal to the number of rows in the second matrix",
  () => {
    const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
    const b = { data: [1, 2, 3, 4, 5, 6], rows: 3, cols: 2 };
    assertThrows(
      () => multiply(a, b),
      Error,
      "Matrices must have compatible dimensions"
    );
  }
);

Deno.test("multiplyMany: should multiply multiple matrices", () => {
  const matrices = [
    { data: [1, 2, 3, 4], rows: 2, cols: 2 },
    { data: [1, 2, 3, 4], rows: 2, cols: 2 },
    { data: [1, 2, 3, 4], rows: 2, cols: 2 },
  ];
  const expected = { data: [37, 54, 81, 118], rows: 2, cols: 2 };
  assertEquals(multiplyMany(matrices), expected);
});

Deno.test(
  "multiplyMany: should throw an error when less than two matrices are provided",
  () => {
    const matrices = [{ data: [1, 2, 3, 4], rows: 2, cols: 2 }];
    assertThrows(
      () => multiplyMany(matrices),
      Error,
      "At least two matrices are required"
    );
  }
);
