import { assertEquals, assertThrows } from "jsr:@std/assert";
import { add, addMany } from "../add.ts";
import { Matrix } from "../matrix.ts";

Deno.test("add function", () => {
  const a = new Matrix([1, 2, 3, 4], 2, 2);
  const b = new Matrix([1, 2, 3, 4], 2, 2);
  const result = add(a, b);
  assertEquals(result.data, [2, 4, 6, 8]);
  assertEquals(result.rows, 2);
  assertEquals(result.cols, 2);
});

Deno.test("add function throws error when dimensions are not the same", () => {
  const a = new Matrix([1, 2, 3, 4], 2, 2);
  const b = new Matrix([1, 2, 3, 4, 4, 5], 2, 3);
  assertThrows(() => add(a, b), Error, "Matrix dimensions must be the same");
});

Deno.test("addMany function", () => {
  const matrices = [
    new Matrix([1, 2, 3, 4], 2, 2),
    new Matrix([1, 2, 3, 4], 2, 2),
    new Matrix([1, 2, 3, 4], 2, 2),
  ];
  const result = addMany(matrices);
  assertEquals(result.data, [3, 6, 9, 12]);
  assertEquals(result.rows, 2);
  assertEquals(result.cols, 2);
});

Deno.test("addMany function throws error when array is empty", () => {
  assertThrows(() => addMany([]), Error, "At least one matrix is required");
});
