import type { Matrix } from "./matrix.ts";

/**
 * Solves a linear system `A * x = b`.
 * @param matrix Left-hand side matrix `A`.
 * @param b Right-hand side vector or matrix.
 * @returns Solution vector or matrix matching the shape of `b`.
 * @throws Error if `matrix` is not square, singular, or dimensions do not match.
 */
export function solve(matrix: Matrix, b: number[]): number[];
export function solve(matrix: Matrix, b: Matrix): Matrix;
export function solve(matrix: Matrix, b: number[] | Matrix): number[] | Matrix {
  if (Array.isArray(b)) {
    return matrix.solve(b);
  }
  return matrix.solve(b);
}
