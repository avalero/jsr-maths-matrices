import type { Matrix } from "./matrix.ts";

/**
 * Computes the trace of a square matrix.
 * @param matrix Input matrix.
 * @returns Sum of diagonal elements.
 * @throws Error if the matrix is not square.
 * @example
 * ```ts
 * const t = trace(new Matrix([1, 2, 3, 4], 2, 2));
 * // t = 5
 * ```
 */
export function trace(matrix: Matrix): number {
  return matrix.trace();
}
