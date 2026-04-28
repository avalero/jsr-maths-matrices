import type { Matrix } from "./matrix.ts";

/**
 * Checks whether a matrix is symmetric within a tolerance.
 * @param matrix Input matrix.
 * @param epsilon Absolute tolerance.
 * @returns `true` when matrix is approximately symmetric.
 */
export function isSymmetric(matrix: Matrix, epsilon: number = 1e-9): boolean {
  return matrix.isSymmetric(epsilon);
}

/**
 * Checks whether a matrix is positive definite.
 * @param matrix Input matrix.
 * @param epsilon Numerical tolerance.
 * @returns `true` if matrix is positive definite.
 */
export function isPositiveDefinite(
  matrix: Matrix,
  epsilon: number = 1e-10,
): boolean {
  return matrix.isPositiveDefinite(epsilon);
}
