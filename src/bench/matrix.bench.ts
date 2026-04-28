import { Matrix } from "../matrix.ts";
import { multiply } from "../multiply.ts";

function makeRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createMatrix(rows: number, cols: number, seed: number): Matrix {
  const random = makeRng(seed);
  const data = new Array(rows * cols);
  for (let i = 0; i < data.length; i++) {
    data[i] = random() * 2 - 1;
  }
  return new Matrix(data, rows, cols);
}

function createDiagonallyDominantMatrix(size: number, seed: number): Matrix {
  const random = makeRng(seed);
  const data = new Array(size * size).fill(0);

  for (let row = 0; row < size; row++) {
    let rowAbsSum = 0;
    for (let col = 0; col < size; col++) {
      if (row === col) {
        continue;
      }
      const value = random() * 2 - 1;
      data[row * size + col] = value;
      rowAbsSum += Math.abs(value);
    }
    data[row * size + row] = rowAbsSum + 1 + random();
  }

  return new Matrix(data, size, size);
}

for (const size of [64, 128, 256]) {
  const a = createMatrix(size, size, 100 + size);
  const b = createMatrix(size, size, 200 + size);
  Deno.bench(`multiply ${size}x${size}`, () => {
    multiply(a, b);
  });
}

for (const size of [4, 8, 12]) {
  const matrix = createMatrix(size, size, 300 + size);
  Deno.bench(`determinant ${size}x${size}`, () => {
    matrix.determinant();
  });
}

for (const size of [4, 8, 12]) {
  const matrix = createDiagonallyDominantMatrix(size, 400 + size);
  Deno.bench(`inverse ${size}x${size}`, () => {
    matrix.getInverse();
  });
}
