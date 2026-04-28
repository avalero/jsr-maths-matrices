import type { Matrix } from "./matrix.ts";

/**
 * Compares two matrices using an absolute tolerance.
 * @param a First matrix.
 * @param b Second matrix.
 * @param epsilon Absolute tolerance.
 * @returns `true` when dimensions match and all entries are within tolerance.
 */
export function equalsApprox(
  a: Matrix,
  b: Matrix,
  epsilon: number = 1e-9,
): boolean {
  return a.equalsApprox(b, epsilon);
}
