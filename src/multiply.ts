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
  const aRows = a.rows;
  const aCols = a.cols;
  const bRows = b.rows;
  const bCols = b.cols;

  if (aCols !== bRows) {
    throw new Error(
      "Number of columns of the first matrix must be the same as the number of rows of the second matrix",
    );
  }

  const aData = a.data;
  const bData = b.data;
  const data = new Array(aRows * bCols).fill(0);

  for (let i = 0; i < aRows; i++) {
    const aRowStart = i * aCols;
    const outRowStart = i * bCols;

    for (let k = 0; k < aCols; k++) {
      const aValue = aData[aRowStart + k];
      const bRowStart = k * bCols;
      for (let j = 0; j < bCols; j++) {
        data[outRowStart + j] += aValue * bData[bRowStart + j];
      }
    }
  }

  return new Matrix(data, aRows, bCols);
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
