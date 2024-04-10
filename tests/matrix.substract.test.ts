// substract.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { substract } from "../matrix/substract.ts";

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
