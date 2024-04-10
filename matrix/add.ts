/**
 * Add operations with matrices.
 */

import type { Matrix } from "./types.ts";

/**
 * Add two matrices.
 * @param a First matrix
 * @param b Second matrix
 * @returns Sum of the two matrices
 * @example add({ data: [1, 2, 3, 4], rows: 2, cols: 2 }, { data: [1, 2, 3, 4], rows: 2, cols: 2 })
 */
export function add(a: Matrix, b: Matrix): Matrix {
  if (a.rows !== b.rows || a.cols !== b.cols) {
    throw new Error("Matrices must have the same dimensions");
  }
  const data = a.data.map((val, i) => val + b.data[i]);
  return { data, rows: a.rows, cols: a.cols };
}

/**
 * Add an array of matrices.
 * @param matrices Array of matrices
 * @returns Sum of the matrices
 * @example addMany([{ data: [1, 2, 3, 4], rows: 2, cols: 2 }, { data: [1, 2, 3, 4], rows: 2, cols: 2 }])
 */
export function addMany(matrices: Matrix[]): Matrix {
  if (matrices.length < 2) {
    throw new Error("At least two matrices are required");
  }
  return matrices.reduce(add);
}
