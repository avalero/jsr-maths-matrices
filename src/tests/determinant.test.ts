// determinant.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { determinant } from "../determinant.ts";
import { Matrix } from "../matrix.ts";

Deno.test("determinant function", () => {
  const matrix = new Matrix([1, 2, 3, 4], 2, 2);
  const result = determinant(matrix);
  assertEquals(result, -2);
});

Deno.test("determinant function throws error when matrix is not square", () => {
  const matrix = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
  assertThrows(() => determinant(matrix), Error, "Matrix must be square");
});
