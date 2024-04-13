import { Matrix } from "./matrix.ts";

/**
 * Calculate the determinant of a matrix
 * @param matrix Matrix to calculate the determinant
 * @returns The determinant of the matrix
 * @throws {Error} Matrix must be square
 * @example determinant(new Matrix([1, 2, 3, 4],2,2))
 * @note Consider using the `determinant` method of the matrix instance instead of this function.
 */
export function determinant(matrix: Matrix): number {
  return matrix.determinant();
}
