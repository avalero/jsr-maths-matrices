/**
 * Multiply operations with matrices.
 */

import type { Matrix } from "./types.ts";

/**
 * Multiply two matrices.
 * @param a First matrix
 * @param b Second matrix
 * @returns Product of the two matrices
 * @example multiply({ data: [1, 2, 3, 4], rows: 2, cols: 2 }, { data: [1, 2, 3, 4], rows: 2, cols: 2 })
 */
export function multiply(a: Matrix, b: Matrix): Matrix {
  if (a.cols !== b.rows) {
    throw new Error("Matrices must have compatible dimensions");
  }
  const data = [];
  for (let i = 0; i < a.rows; i++) {
    for (let j = 0; j < b.cols; j++) {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) {
        sum += a.data[i * a.cols + k] * b.data[k * b.cols + j];
      }
      data.push(sum);
    }
  }
  return { data, rows: a.rows, cols: b.cols };
}

/**
 * Multiply an array of matrices.
 * @param matrices Array of matrices
 * @returns Product of the matrices
 * @example multiplyMany([{ data: [1, 2, 3, 4], rows: 2, cols: 2 }, { data: [1, 2, 3, 4], rows: 2, cols: 2 }])
 */
export function multiplyMany(matrices: Matrix[]): Matrix {
  if (matrices.length < 2) {
    throw new Error("At least two matrices are required");
  }
  return matrices.reduce(multiply);
}
