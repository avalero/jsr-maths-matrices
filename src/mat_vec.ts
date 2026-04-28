import type { Matrix } from "./matrix.ts";

/**
 * Multiplies a matrix by a vector.
 * @param matrix Input matrix.
 * @param vector Input vector.
 * @returns Resulting vector.
 * @throws Error if vector length does not match matrix columns.
 */
export function matVec(matrix: Matrix, vector: number[]): number[] {
  return matrix.matVec(vector);
}
