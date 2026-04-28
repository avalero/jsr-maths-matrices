import type { Matrix } from "./matrix.ts";

/**
 * Multiplies all matrix elements by a scalar value.
 * @param matrix Input matrix.
 * @param scalar Scalar value.
 * @returns Scaled matrix.
 */
export function scale(matrix: Matrix, scalar: number): Matrix {
  return matrix.scale(scalar);
}
