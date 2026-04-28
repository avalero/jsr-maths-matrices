import type { Matrix } from "./matrix.ts";

/**
 * Computes element-wise (Hadamard) product of two matrices.
 * @param a First matrix.
 * @param b Second matrix.
 * @returns Hadamard product matrix.
 * @throws Error if matrix dimensions differ.
 */
export function hadamard(a: Matrix, b: Matrix): Matrix {
  return a.hadamard(b);
}
