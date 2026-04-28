import type { Matrix } from "./matrix.ts";

/**
 * Concatenates two matrices horizontally (`[A | B]`).
 * @param a Left matrix.
 * @param b Right matrix.
 * @returns Concatenated matrix.
 */
export function concatHorizontal(a: Matrix, b: Matrix): Matrix {
  return a.concatHorizontal(b);
}

/**
 * Concatenates two matrices vertically.
 * @param a Top matrix.
 * @param b Bottom matrix.
 * @returns Concatenated matrix.
 */
export function concatVertical(a: Matrix, b: Matrix): Matrix {
  return a.concatVertical(b);
}
