import type { Matrix } from "./matrix.ts";

/**
 * Solves `min_x ||A x - b||_2` using QR decomposition.
 * @param matrix Left-hand side matrix `A`.
 * @param b Right-hand side vector or matrix.
 * @param epsilon Threshold for rank checks and numerical stability.
 * @returns Least-squares solution.
 */
export function solveLeastSquares(
  matrix: Matrix,
  b: number[],
  epsilon?: number,
): number[];
export function solveLeastSquares(
  matrix: Matrix,
  b: Matrix,
  epsilon?: number,
): Matrix;
export function solveLeastSquares(
  matrix: Matrix,
  b: number[] | Matrix,
  epsilon: number = 1e-10,
): number[] | Matrix {
  if (Array.isArray(b)) {
    return matrix.solveLeastSquares(b, epsilon);
  }
  return matrix.solveLeastSquares(b, epsilon);
}
