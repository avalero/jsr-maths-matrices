import { Matrix } from "./matrix.ts";

/**
 * Inverts a matrix.
 * @param {Matrix} matrix The matrix to invert.
 * @returns {Matrix} The inverted matrix.
 * @example invert(new Matrix([[1, 2], [3, 4]])); // returns [[-2, 1], [1.5, -0.5]]
 * @note Consider using the `getInverse` method of the matrix instance instead of this function.
 */
export default  function invert(matrix: Matrix): Matrix {
  
  return matrix.getInverse();
}