import {
  assert,
  assertAlmostEquals,
  assertEquals,
  assertThrows,
} from "@std/assert";
import { Matrix } from "../matrix.ts";
import { multiply } from "../multiply.ts";
import { transpose } from "../transpose.ts";
import { equalsApprox as equalsApproxFn } from "../equals_approx.ts";
import { frobeniusNorm, norm1, normInf } from "../norm.ts";
import { hadamard as hadamardFn } from "../hadamard.ts";
import { lu as luFn } from "../lu.ts";
import { matVec as matVecFn } from "../mat_vec.ts";
import { qr as qrFn } from "../qr.ts";
import { rank as rankFn } from "../rank.ts";
import { scale as scaleFn } from "../scale.ts";
import { solve as solveFn } from "../solve.ts";
import { trace as traceFn } from "../trace.ts";

function assertMatrixAlmostEquals(
  a: Matrix,
  b: Matrix,
  epsilon: number = 1e-9,
): void {
  assertEquals(a.rows, b.rows);
  assertEquals(a.cols, b.cols);
  for (let i = 0; i < a.data.length; i++) {
    assertAlmostEquals(a.data[i], b.data[i], epsilon);
  }
}

Deno.test("Matrix utility methods and wrappers", () => {
  const a = new Matrix([1, 2, 3, 4], 2, 2);
  const b = new Matrix([2, 3, 4, 5], 2, 2);

  assertEquals(a.scale(2).data, [2, 4, 6, 8]);
  assertEquals(scaleFn(a, 2).data, [2, 4, 6, 8]);

  assertEquals(a.hadamard(b).data, [2, 6, 12, 20]);
  assertEquals(hadamardFn(a, b).data, [2, 6, 12, 20]);

  assertEquals(a.matVec([5, 6]), [17, 39]);
  assertEquals(matVecFn(a, [5, 6]), [17, 39]);

  assertEquals(a.trace(), 5);
  assertEquals(traceFn(a), 5);

  assertEquals(a.norm1(), 6);
  assertEquals(norm1(a), 6);
  assertEquals(a.normInf(), 7);
  assertEquals(normInf(a), 7);
  assertAlmostEquals(a.frobeniusNorm(), Math.sqrt(30), 1e-12);
  assertAlmostEquals(frobeniusNorm(a), Math.sqrt(30), 1e-12);

  assert(a.equalsApprox(new Matrix([1, 2, 3, 4 + 1e-10], 2, 2), 1e-9));
  assert(equalsApproxFn(a, new Matrix([1, 2, 3, 4 + 1e-10], 2, 2), 1e-9));
});

Deno.test("LU decomposition reconstructs P*A = L*U", () => {
  const a = new Matrix(
    [
      2,
      1,
      1,
      4,
      -6,
      0,
      -2,
      7,
      2,
    ],
    3,
    3,
  );

  const { L, U, P } = a.lu();
  const pa = multiply(P, a);
  const lu = multiply(L, U);
  assertMatrixAlmostEquals(pa, lu, 1e-9);

  const luViaFn = luFn(a);
  assertMatrixAlmostEquals(
    multiply(luViaFn.P, a),
    multiply(luViaFn.L, luViaFn.U),
  );
});

Deno.test("QR decomposition reconstructs A and Q is orthonormal", () => {
  const a = new Matrix(
    [
      12,
      -51,
      4,
      6,
      167,
      -68,
      -4,
      24,
      -41,
    ],
    3,
    3,
  );

  const { Q, R } = a.qr();
  const reconstructed = multiply(Q, R);
  assertMatrixAlmostEquals(reconstructed, a, 1e-8);

  const qtq = multiply(transpose(Q), Q);
  assertMatrixAlmostEquals(qtq, Matrix.createIdentity(qtq.rows), 1e-8);

  const qrViaFn = qrFn(a);
  assertMatrixAlmostEquals(multiply(qrViaFn.Q, qrViaFn.R), a, 1e-8);
});

Deno.test("Rank and solve support vector and matrix rhs", () => {
  const rankDeficient = new Matrix(
    [
      1,
      2,
      3,
      2,
      4,
      6,
      3,
      6,
      9,
    ],
    3,
    3,
  );
  assertEquals(rankDeficient.rank(), 1);
  assertEquals(rankFn(rankDeficient), 1);

  const a = new Matrix(
    [
      3,
      2,
      -1,
      2,
      -2,
      4,
      -1,
      0.5,
      -1,
    ],
    3,
    3,
  );
  const x = a.solve([1, -2, 0]);
  assertMatrixAlmostEquals(
    new Matrix(a.matVec(x), 3, 1),
    new Matrix([1, -2, 0], 3, 1),
    1e-9,
  );

  const xViaFn = solveFn(a, [1, -2, 0]);
  assertEquals(xViaFn.length, 3);

  const b = new Matrix(
    [
      1,
      0,
      -2,
      1,
      0,
      3,
    ],
    3,
    2,
  );
  const xMatrix = a.solve(b);
  assertMatrixAlmostEquals(multiply(a, xMatrix), b, 1e-8);

  const xMatrixViaFn = solveFn(a, b);
  assertMatrixAlmostEquals(multiply(a, xMatrixViaFn), b, 1e-8);
});

Deno.test("New APIs keep error semantics for invalid dimensions", () => {
  const a = new Matrix([1, 2, 3, 4], 2, 2);
  const nonSquare = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);

  assertThrows(
    () => a.hadamard(nonSquare),
    Error,
    "Matrix dimensions must be the same",
  );
  assertThrows(
    () => nonSquare.trace(),
    Error,
    "Matrix must be square",
  );
  assertThrows(
    () => nonSquare.solve([1, 2]),
    Error,
    "Matrix must be square",
  );
  assertThrows(
    () => a.matVec([1, 2, 3]),
    Error,
    "Vector length must match the number of matrix columns",
  );
});
