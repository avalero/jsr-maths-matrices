// substract.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { substract, substractMany } from "../matrix/substract.ts";

Deno.test(
  "substract: should substract two matrices of the same dimensions",
  () => {
    const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
    const b = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
    const expected = { data: [0, 0, 0, 0], rows: 2, cols: 2 };
    assertEquals(substract(a, b), expected);
  }
);

Deno.test(
  "substract: should throw an error when matrices have different dimensions",
  () => {
    const a = { data: [1, 2, 3, 4], rows: 2, cols: 2 };
    const b = { data: [1, 2, 3, 4], rows: 2, cols: 3 };
    assertThrows(
      () => substract(a, b),
      Error,
      "Matrices must have the same dimensions"
    );
  }
);

Deno.test(
  "substractMany: should substract multiple matrices of the same dimensions",
  () => {
    const matrices = [
      { data: [3, 3, 3, 3], rows: 2, cols: 2 },
      { data: [1, 1, 1, 1], rows: 2, cols: 2 },
      { data: [1, 1, 1, 1], rows: 2, cols: 2 },
    ];
    const expected = { data: [1, 1, 1, 1], rows: 2, cols: 2 };
    assertEquals(substractMany(matrices), expected);
  }
);

Deno.test(
  "substractMany: should throw an error when less than two matrices are provided",
  () => {
    const matrices = [{ data: [1, 2, 3, 4], rows: 2, cols: 2 }];
    assertThrows(
      () => substractMany(matrices),
      Error,
      "At least two matrices are required"
    );
  }
);
