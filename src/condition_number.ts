import type { Matrix } from "./matrix.ts";

/**
 * Computes matrix condition number in 1-norm.
 * @param matrix Input square matrix.
 * @returns `||A||_1 * ||A^{-1}||_1`.
 */
export function conditionNumber1(matrix: Matrix): number {
  return matrix.conditionNumber1();
}

/**
 * Computes matrix condition number in infinity-norm.
 * @param matrix Input square matrix.
 * @returns `||A||_inf * ||A^{-1}||_inf`.
 */
export function conditionNumberInf(matrix: Matrix): number {
  return matrix.conditionNumberInf();
}
