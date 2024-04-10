// add.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { add, addMany } from "../matrix/add.ts";

Deno.test("add: should add two matrices of the same dimensions", () => {
  const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
  const b = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
  const expected = { data: [2, 4, 6, 8], rows: 2, cols: 2 };
  assertEquals(add(a, b), expected);
});

Deno.test(
  "add: should throw an error when matrices have different dimensions",
  () => {
    const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
    const b = { data: [1, 2, 3, 4], rows: 2, cols: 3 };
    assertThrows(
      () => add(a, b),
      Error,
      "Matrices must have the same dimensions"
    );
  }
);

Deno.test(
  "addMany: should add multiple matrices of the same dimensions",
  () => {
    const matrices = [
      { data: [1, 2, 3, 4], rows: 2, cols: 2 },
      { data: [1, 2, 3, 4], rows: 2, cols: 2 },
      { data: [1, 2, 3, 4], rows: 2, cols: 2 },
    ];
    const expected = { data: [3, 6, 9, 12], rows: 2, cols: 2 };
    assertEquals(addMany(matrices), expected);
  }
);

Deno.test(
  "addMany: should throw an error when less than two matrices are provided",
  () => {
    const matrices = [{ data: [1, 2, 3, 4], rows: 2, cols: 2 }];
    assertThrows(
      () => addMany(matrices),
      Error,
      "At least two matrices are required"
    );
  }
);
