/**
 * Determinant of a matrix.
 */

import type { Matrix } from "./types.ts";

/**
 * Cofactor of a matrix.
 * @param a Matrix
 * @param row Row
 * @param col Column
 * @returns Cofactor of the matrix
 * @example cofactor({ data: [1, 2, 3, 4], rows: 2, cols: 2 }, 0, 0)
 */
export function cofactor(a: Matrix, row: number, col: number): number {
  const minor = [];
  for (let i = 0; i < a.rows; i++) {
    if (i === row) {
      continue;
    }
    for (let j = 0; j < a.cols; j++) {
      if (j === col) {
        continue;
      }
      minor.push(a.data[i * a.cols + j]);
    }
  }
  return (row + col) % 2 === 0
    ? determinant({ data: minor, rows: a.rows - 1, cols: a.cols - 1 })
    : -determinant({ data: minor, rows: a.rows - 1, cols: a.cols - 1 });
}

/**
 * Determinant of a matrix.
 * @param a Matrix
 * @returns Determinant of the matrix
 * @example determinant({ data: [1, 2, 3, 4], rows: 2, cols: 2 })
 */

export function determinant(a: Matrix): number {
  if (a.rows !== a.cols) {
    throw new Error("Matrix must be square");
  }
  if (a.rows === 1) {
    return a.data[0];
  }
  if (a.rows === 2) {
    return a.data[0] * a.data[3] - a.data[1] * a.data[2];
  }
  let det = 0;
  for (let i = 0; i < a.cols; i++) {
    det += a.data[i] * cofactor(a, 0, i);
  }
  return det;
}
