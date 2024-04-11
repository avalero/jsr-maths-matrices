/**
 * Add operations with matrices.
 */

import { Matrix } from "./matrix.ts";

/**
 * Add two matrices.
 * @param a First matrix
 * @param b Second matrix
 * @returns Sum of the two matrices
 * @throws {Error} Matrix dimensions must be the same
 * @example add(new Matrix([1, 2, 3, 4],2,2 ), new Matrix([1, 2, 3, 4],2,2))
 */
export function add(a: Matrix, b: Matrix): Matrix {
  if (a.rows !== b.rows || a.cols !== b.cols) {
    throw new Error("Matrix dimensions must be the same");
  }
  return new Matrix(
    a.data.map((value, index) => value + b.data[index]),
    a.rows,
    a.cols
  );
}

/**
 * Add an array of matrices.
 * @param matrices Array of matrices
 * @returns Sum of the matrices
 * @throws {Error} At least one matrix is required
 * @example addMany([new Matrix([1, 2, 3, 4],2,2 ), new Matrix([1, 2, 3, 4],2,2)])
 */
export function addMany(matrices: Matrix[]): Matrix {
  if (matrices.length === 0) {
    throw new Error("At least one matrix is required");
  }

  const [first, ...rest] = matrices;
  // check all dimensions are the same

  if (
    rest.some(
      (matrix) => matrix.rows !== first.rows || matrix.cols !== first.cols
    )
  ) {
    throw new Error("Matrix dimensions must be the same");
  }

  return rest.reduce((acc, matrix) => add(acc, matrix), first);
}
