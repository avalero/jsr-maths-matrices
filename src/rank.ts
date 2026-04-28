import type { Matrix } from "./matrix.ts";

/**
 * Computes the numerical rank of a matrix.
 * @param matrix Input matrix.
 * @param epsilon Pivot threshold used to treat small pivots as zero.
 * @returns Numerical rank.
 * @example
 * ```ts
 * const r = rank(new Matrix([1, 2, 2, 4], 2, 2));
 * // r = 1
 * ```
 */
export function rank(matrix: Matrix, epsilon: number = 1e-10): number {
  return matrix.rank(epsilon);
}
