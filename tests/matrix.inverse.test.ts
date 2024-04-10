// inverse.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { inverse } from "../matrix/inverse.ts";

Deno.test("inverse: should return the inverse of a matrix", () => {
  const a = { data: [4, 7, 2, 6], rows: 2, cols: 2 };
  const expected = { data: [0.6, -0.2, -0.7, 0.4], rows: 2, cols: 2 };
  const result = inverse(a);
  result.data = result.data.map((val) => parseFloat(val.toFixed(1)));
  assertEquals(result, expected);
});

Deno.test(
  "inverse: should throw an error when the matrix is not square",
  () => {
    const a = { data: [1, 2, 3, 4, 5, 6], rows: 2, cols: 3 };
    assertThrows(() => inverse(a), Error, "Matrix must be square");
  }
);

Deno.test("inverse: should throw an error when the matrix is singular", () => {
  const a = { data: [1, 2, 2, 4], rows: 2, cols: 2 };
  assertThrows(
    () => inverse(a),
    Error,
    "Matrix is singular and cannot be inverted"
  );
});
