// determinant.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { cofactor, determinant } from "../matrix/determinant.ts";

Deno.test("cofactor: should return the cofactor of a matrix", () => {
  const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
  assertEquals(cofactor(a, 0, 0), 4);
  assertEquals(cofactor(a, 0, 1), -3);
  assertEquals(cofactor(a, 1, 0), -2);
  assertEquals(cofactor(a, 1, 1), 1);
});

Deno.test("determinant: should return the determinant of a matrix", () => {
  const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
  assertEquals(determinant(a), -2);
});

Deno.test("determinant: should return the determinant of a 3x3 matrix", () => {
  const a = { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], rows: 3, cols: 3 };
  assertEquals(determinant(a), 0);
});

Deno.test("determinant: should return the determinant of a 4x4 matrix", () => {
  const a = {
    data: [1, 2, 2, 4, 5, 6, 7, 8, 9, 12, 11, 12, 13, 14, 15, 16],
    rows: 4,
    cols: 4,
  };
  assertEquals(determinant(a), 48);
});

Deno.test(
  "determinant: should throw an error when the matrix is not square",
  () => {
    const a = { data: [1, 2, 3, 4, 5, 6], rows: 2, cols: 3 };
    assertThrows(() => determinant(a), Error, "Matrix must be square");
  }
);
