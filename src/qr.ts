import type { Matrix, QRDecomposition } from "./matrix.ts";

/**
 * Computes reduced QR decomposition using modified Gram-Schmidt.
 * @param matrix Input matrix.
 * @param epsilon Threshold used to treat dependent vectors as zero.
 * @returns Decomposition `{ Q, R }` such that `A = Q * R`.
 */
export function qr(
  matrix: Matrix,
  epsilon: number = 1e-10,
): QRDecomposition {
  return matrix.qr(epsilon);
}
