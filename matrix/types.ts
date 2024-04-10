/**
 * Matrix type
 * @typedef {Object} Matrix
 * @property {number[]} data - Matrix data
 * @property {number} rows - Number of rows
 * @property {number} cols - Number of columns
 * @example const matrix: Matrix = { data: [1, 2, 3, 4], rows: 2, cols: 2 }
 */
export type Matrix = {
  data: number[];
  rows: number;
  cols: number;
};
