import type { Matrix } from "./matrix.ts";
import { Matrix as MatrixClass } from "./matrix.ts";

/**
 * Creates a diagonal matrix from vector entries.
 * @param values Diagonal values.
 * @returns Diagonal matrix.
 */
export function fromDiagonal(values: number[]): Matrix {
  return MatrixClass.fromDiagonal(values);
}

/**
 * Returns the diagonal vector of a square matrix.
 * @param matrix Input square matrix.
 * @returns Diagonal values.
 */
export function diag(matrix: Matrix): number[] {
  return matrix.diag();
}
