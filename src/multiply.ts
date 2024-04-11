import { Matrix } from "./matrix.ts";

/**
 * Multiply two matrices
 * @param a First matrix
 * @param b Second matrix
 * @returns Multiplication of the two matrices
 * @throws {Error} Number of columns of the first matrix must be the same as the number of rows of the second matrix
 * @example multiply(new Matrix([1, 2, 3, 4],2,2 ), new Matrix([1, 2, 3, 4],2,2))
 * @example multiply(new Matrix([1, 2, 3, 4, 5, 6],2,3 ), new Matrix([1, 2, 3, 4, 5, 6],3,2))
 */
export function multiply(a: Matrix, b: Matrix): Matrix {
  if (a.cols !== b.rows) {
    throw new Error(
      "Number of columns of the first matrix must be the same as the number of rows of the second matrix"
    );
  }

  const data = new Array(a.rows * b.cols).fill(0);

  for (let i = 0; i < a.rows; i++) {
    for (let j = 0; j < b.cols; j++) {
      for (let k = 0; k < a.cols; k++) {
        data[i * b.cols + j] += a.get(i, k) * b.get(k, j);
      }
    }
  }

  return new Matrix(data, a.rows, b.cols);
}

/**
 * Multiply an array of matrices
 * @param matrices Array of matrices
 * @returns Multiplication of the matrices
 * @throws {Error} At least one matrix is required
 * @example multiplyMany([new Matrix([1, 2, 3, 4],2,2 ), new Matrix([1, 2, 3, 4],2,2)])
 * @example multiplyMany([new Matrix([1, 2, 3, 4, 5, 6],2,3 ), new Matrix([1, 2, 3, 4, 5, 6],3,2)])
 */
export function multiplyMany(matrices: Matrix[]): Matrix {
  if (matrices.length === 0) {
    throw new Error("At least one matrix is required");
  }

  return matrices.reduce((acc, matrix) => multiply(acc, matrix));
}
