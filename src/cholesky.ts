import type { Matrix } from "./matrix.ts";

/**
 * Computes Cholesky factorization for a symmetric positive-definite matrix.
 * @param matrix Input square matrix.
 * @param epsilon Numerical tolerance used for positivity checks.
 * @returns Lower-triangular matrix `L` such that `A = L * L^T`.
 */
export function cholesky(matrix: Matrix, epsilon: number = 1e-10): Matrix {
  return matrix.cholesky(epsilon);
}
