import type { Matrix } from "./matrix.ts";
import { Matrix as MatrixClass } from "./matrix.ts";

/**
 * Builds a block matrix from a 2D array of matrices.
 * @param blocks Block rows and columns.
 * @returns Composed block matrix.
 */
export function block(blocks: Matrix[][]): Matrix {
  return MatrixClass.block(blocks);
}
