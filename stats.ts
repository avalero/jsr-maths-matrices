/**
 * This module contains functions for basic statistical operations.
 * @packageDocumentation
 * @module Stats
 */

/**
 * Compute average of an array of numbers
 * @param arr Array of numbers
 * @returns average of numbers in the array
 */
export const average = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
};

/**
 * Compute variance of an array of numbers
 * @param arr Array of numbers
 * @returns Variance of the array
 */
export const variance = (arr: number[]): number => {
  const mean = average(arr);
  const sum = arr.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0);
  return sum / arr.length;
};

/**
 * Compute standard deviation of an array of numbers
 * @param arr Array of numbers
 * @returns maximum number in the array
 */
export function stdDev(arr: number[]): number {
  return Math.sqrt(variance(arr));
}

/**
 * Compute median of an array of numbers
 * @param arr Array of numbers
 * @returns median number in the array
 */
export function median(arr: number[]): number {
  const sorted = arr.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}
