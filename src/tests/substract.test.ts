// substract.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { substract } from "../substract.ts";
import { Matrix } from "../matrix.ts";

Deno.test("substract function", () => {
  const a = new Matrix([1, 2, 3, 4], 2, 2);
  const b = new Matrix([1, 2, 3, 4], 2, 2);
  const result = substract(a, b);
  assertEquals(result.data, [0, 0, 0, 0]);
  assertEquals(result.rows, 2);
  assertEquals(result.cols, 2);
});

Deno.test(
  "substract function throws error when dimensions are not the same",
  () => {
    const a = new Matrix([1, 2, 3, 4], 2, 2);
    const b = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
    assertThrows(
      () => substract(a, b),
      Error,
      "Matrix dimensions must be the same"
    );
  }
);
