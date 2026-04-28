import type { LUDecomposition, Matrix } from "./matrix.ts";

/**
 * Computes LU decomposition with partial pivoting.
 * @param matrix Input square matrix.
 * @param epsilon Pivot threshold used to detect singularity.
 * @returns LU decomposition such that `P * A = L * U`.
 * @throws Error if matrix is not square or singular.
 */
export function lu(
  matrix: Matrix,
  epsilon: number = 1e-10,
): LUDecomposition {
  return matrix.lu(epsilon);
}
