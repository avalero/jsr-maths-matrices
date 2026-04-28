import type { Matrix } from "./matrix.ts";

/**
 * Computes the matrix 1-norm (maximum absolute column sum).
 * @param matrix Input matrix.
 * @returns 1-norm.
 */
export function norm1(matrix: Matrix): number {
  return matrix.norm1();
}

/**
 * Computes the matrix infinity-norm (maximum absolute row sum).
 * @param matrix Input matrix.
 * @returns Infinity-norm.
 */
export function normInf(matrix: Matrix): number {
  return matrix.normInf();
}

/**
 * Computes the Frobenius norm.
 * @param matrix Input matrix.
 * @returns Frobenius norm.
 */
export function frobeniusNorm(matrix: Matrix): number {
  return matrix.frobeniusNorm();
}
