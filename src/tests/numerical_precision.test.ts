import { assert, assertEquals } from "@std/assert";
import { Matrix, multiply } from "../../mod.ts";

Deno.test("small values are preserved by scalar result operations", () => {
  const scalar = new Matrix([3e-13], 1, 1);
  const identity = Matrix.createIdentity(2);

  assertEquals(scalar.trace(), 3e-13);
  assertEquals(scalar.determinant(), 3e-13);
  assertEquals(identity.matVec([3e-13, 1]), [3e-13, 1]);
  assertEquals(multiply(identity, new Matrix([3e-13, 1], 2, 1)).data, [
    3e-13,
    1,
  ]);
});

Deno.test("determinant preserves small nonzero results", () => {
  const scaledIdentity = new Matrix(
    [
      1e-5,
      0,
      0,
      0,
      1e-5,
      0,
      0,
      0,
      1e-5,
    ],
    3,
    3,
  );

  assert(Math.abs(scaledIdentity.determinant() - 1e-15) < 1e-29);
});

Deno.test("inverse and solve use scale-aware pivots", () => {
  const small = new Matrix(
    [
      1e-11,
      0,
      0,
      0,
      1e-11,
      0,
      0,
      0,
      1e-11,
    ],
    3,
    3,
  );
  const large = new Matrix([1e13, 0, 0, 1e13], 2, 2);

  assertEquals(small.getInverse().data, [1e11, 0, 0, 0, 1e11, 0, 0, 0, 1e11]);
  assertEquals(large.getInverse().data, [1e-13, 0, 0, 1e-13]);
  assertEquals(large.solve([1, 1]), [1e-13, 1e-13]);
  assert(Math.abs(large.conditionNumber1() - 1) < 1e-15);
});
