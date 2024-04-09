/**
 *
 * @param arr Array of numbers
 * @returns average of numbers in the array
 */

export const average = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
};

export const variance = (arr: number[]): number => {
  const mean = average(arr);
  const sum = arr.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0);
  return sum / arr.length;
};

/**
 *
 * @param arr Array of numbers
 * @returns maximum number in the array
 */
export const stdDev = (arr: number[]): number => {
  return Math.sqrt(variance(arr));
};

/**
 *
 * @param arr Array of numbers
 * @returns median number in the array
 */
export const median = (arr: number[]): number => {
  const sorted = arr.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};
