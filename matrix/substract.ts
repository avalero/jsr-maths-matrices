/**
 * Substract operations with matrices.
 */

import type { Matrix } from "./types.ts";

/**
 * Substract two matrices.
 * @param a First matrix
 * @param b Second matrix
 * @returns Difference of the two matrices
 * @example substract({ data: [1, 2, 3, 4], rows: 2, cols: 2 }, { data: [1, 2, 3, 4], rows: 2, cols: 2 })
 */
export function substract(a: Matrix, b: Matrix): Matrix {
  if (a.rows !== b.rows || a.cols !== b.cols) {
    throw new Error("Matrices must have the same dimensions");
  }
  const data = a.data.map((val, i) => val - b.data[i]);
  return { data, rows: a.rows, cols: a.cols };
}

/**
 * Substract an array of matrices.
 * @param matrices Array of matrices
 * @returns Difference of the matrices
 * @example substractMany([{ data: [1, 2, 3, 4], rows: 2, cols: 2 }, { data: [1, 2, 3, 4], rows: 2, cols: 2 }])
 */

export function substractMany(matrices: Matrix[]): Matrix {
  if (matrices.length < 2) {
    throw new Error("At least two matrices are required");
  }
  return matrices.reduce(substract);
}
