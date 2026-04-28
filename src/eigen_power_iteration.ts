import type { EigenPowerIterationResult, Matrix } from "./matrix.ts";

/**
 * Computes the dominant eigenpair with power iteration.
 * @param matrix Input square matrix.
 * @param maxIterations Maximum number of iterations.
 * @param tolerance Convergence tolerance on residual norm.
 * @returns Dominant eigenpair estimate.
 */
export function eigenPowerIteration(
  matrix: Matrix,
  maxIterations: number = 1000,
  tolerance: number = 1e-10,
): EigenPowerIterationResult {
  return matrix.eigenPowerIteration(maxIterations, tolerance);
}
