/**
 * Inverse of matrix.
 */

import type { Matrix } from "./types.ts";
import { determinant, cofactor } from "./determinant.ts";
/**
 * Inverse of a matrix.
 * @param a Matrix
 * @returns Inverse of the matrix
 * @example inverse({ data: [1, 2, 3, 4], rows: 2, cols: 2 })
 */
export function inverse(a: Matrix): Matrix {
  if (a.rows !== a.cols) {
    throw new Error("Matrix must be square");
  }
  const det = determinant(a);
  if (det === 0) {
    throw new Error("Matrix is singular and cannot be inverted");
  }
  const adjugate: Matrix = {
    data: [],
    rows: a.rows,
    cols: a.cols,
  };
  for (let i = 0; i < a.rows; i++) {
    for (let j = 0; j < a.cols; j++) {
      const cof = cofactor(a, i, j);
      adjugate.data.push(cof);
    }
  }
  const inverse = {
    data: adjugate.data.map((val) => val / det),
    rows: a.rows,
    cols: a.cols,
  };
  return inverse;
}
