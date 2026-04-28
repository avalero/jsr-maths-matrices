import type { Matrix } from "./matrix.ts";

/**
 * Transpose a matrix
 * @param matrix Matrix to transpose
 * @returns The transposed matrix
 * @example transpose(new Matrix([1, 2, 3, 4],2,2))
 * @note Consider using the `transpose` method of the matrix instance instead of this function.
 */
export function transpose(matrix: Matrix): Matrix {
  return matrix.getTranspose();
}

export default transpose;
