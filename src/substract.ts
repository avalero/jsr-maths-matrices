import { Matrix } from "./matrix.ts";

/**
 * Substract two matrices
 * @param a First matrix
 * @param b Second matrix
 * @returns Substraction of the two matrices
 * @throws {Error} Matrix dimensions must be the same
 * @example substract(new Matrix([1, 2, 3, 4],2,2 ), new Matrix([1, 2, 3, 4],2,2))
 */
export function substract(a: Matrix, b: Matrix): Matrix {
  if (a.rows !== b.rows || a.cols !== b.cols) {
    throw new Error("Matrix dimensions must be the same");
  }
  return new Matrix(
    a.data.map((value, index) => value - b.data[index]),
    a.rows,
    a.cols
  );
}
