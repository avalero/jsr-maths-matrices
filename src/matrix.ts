/**
 * Represents a matrix for linear algebra operations.
 * @module Matrix
 */
export interface LUDecomposition {
  /** Lower triangular matrix with unit diagonal. */
  L: Matrix;
  /** Upper triangular matrix. */
  U: Matrix;
  /** Permutation matrix such that `P * A = L * U`. */
  P: Matrix;
  /** Sign introduced by row permutations (`1` or `-1`). */
  pivotSign: number;
}

export interface QRDecomposition {
  /** Reduced orthonormal matrix. */
  Q: Matrix;
  /** Reduced upper-triangular matrix. */
  R: Matrix;
}

export interface EigenPowerIterationResult {
  /** Dominant eigenvalue estimate. */
  eigenvalue: number;
  /** Dominant eigenvector estimate (unit norm). */
  eigenvector: number[];
  /** Number of iterations performed. */
  iterations: number;
}

export class Matrix {
  private _data: number[];
  private _rows: number;
  private _cols: number;

  private static normalizeNumber(value: number): number {
    if (Math.abs(value) < 1e-12) {
      return 0;
    }
    const roundedInteger = Math.round(value);
    if (Math.abs(value - roundedInteger) < 1e-12) {
      return roundedInteger;
    }
    return Number(value.toPrecision(15));
  }

  /**
   * Constructs a matrix with the provided data, rows, and columns.
   * @param data Array of numbers representing the matrix elements in row-major order.
   * @param rows Number of rows in the matrix.
   * @param cols Number of columns in the matrix.
   * @throws Error if the length of data does not equal rows * cols.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2); // Creates a 2x2 matrix
   */
  constructor(data: number[], rows: number, cols: number) {
    if (data.length !== rows * cols) {
      throw new Error("Invalid matrix dimensions");
    }
    this._data = data;
    this._rows = rows;
    this._cols = cols;
  }

  /**
   * Create Matrix form array of arrays
   * @param data Array of arrays representing the matrix elements.
   * @throws Error if the length of data does not equal rows * cols.
   * @example
   * ```ts
   * const matrix = Matrix.fromArray([
   *  [1, 2, 3],
   * [4, 5, 6],
   * [7, 8, 9]
   * ]);
   * ```
   * @returns Matrix
   */
  static from2DArray(data: number[][]): Matrix {
    const rows = data.length;
    const cols = data[0].length;
    // check if all rows have the same length
    if (!data.every((row) => row.length === cols)) {
      throw new Error("Invalid matrix dimensions");
    }

    const flatData = data.flat();
    return new Matrix(flatData, rows, cols);
  }

  /**
   * Returns 2D array representation of the matrix
   * @returns 2D array representation of the matrix
   * @example
   * ```ts
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.toArray()); // Output: [[1, 2], [3, 4]]
   */
  to2DArray(): number[][] {
    const result = [];
    for (let i = 0; i < this._rows; i++) {
      result.push(this.getRow(i));
    }
    return result;
  }

  /**
   * Creates an identity matrix of the specified size.
   * @param size  Size of the identity matrix.
   * @returns A new identity matrix of the specified size.
   * @example const identity = Matrix.createIdentity(3); // Creates a 3x3 identity matrix
   */
  static createIdentity(size: number): Matrix {
    const data = new Array(size * size).fill(0);
    for (let i = 0; i < size; i++) {
      data[i * size + i] = 1;
    }
    return new Matrix(data, size, size);
  }

  /**
   * Creates a matrix of the specified size with all elements set to zero.
   * @param rows Number of rows in the matrix.
   * @param cols Number of columns in the matrix.
   * @returns A new matrix of the specified size with all elements set to zero.
   * @example const zero = Matrix.createZero(2, 3); // Creates a 2x3 matrix of zeros
   */
  static createZero(rows: number, cols: number): Matrix {
    return new Matrix(new Array(rows * cols).fill(0), rows, cols);
  }

  /**
   * Creates a diagonal matrix from vector entries.
   * @param values Diagonal values.
   * @returns Square diagonal matrix.
   * @example
   * ```ts
   * const d = Matrix.fromDiagonal([1, 2, 3]);
   * // d.data = [1,0,0,0,2,0,0,0,3]
   * ```
   */
  static fromDiagonal(values: number[]): Matrix {
    const n = values.length;
    const data = new Array(n * n).fill(0);
    for (let i = 0; i < n; i++) {
      data[i * n + i] = values[i];
    }
    return new Matrix(data, n, n);
  }

  /**
   * Returns the data of the matrix as a flat array.
   * @returns Array of matrix elements.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.data); // Output: [1, 2, 3, 4]
   */
  get data(): number[] {
    return this._data;
  }

  /**
   * Returns the diagonal values of a square matrix.
   * @returns Diagonal vector.
   * @throws Error if the matrix is not square.
   */
  diag(): number[] {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    const out = new Array(this._rows);
    for (let i = 0; i < this._rows; i++) {
      out[i] = this._data[i * this._cols + i];
    }
    return out;
  }

  /**
   * Checks whether the matrix is symmetric within a tolerance.
   * @param epsilon Absolute tolerance used for comparison.
   * @returns `true` when square and approximately symmetric.
   */
  isSymmetric(epsilon: number = 1e-9): boolean {
    if (epsilon < 0) {
      throw new Error("Epsilon must be non-negative");
    }
    if (this._rows !== this._cols) {
      return false;
    }
    for (let row = 0; row < this._rows; row++) {
      for (let col = row + 1; col < this._cols; col++) {
        const a = this._data[row * this._cols + col];
        const b = this._data[col * this._cols + row];
        if (Math.abs(a - b) > epsilon) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Concatenates two matrices horizontally (`[A | B]`).
   * @param other Matrix to append on the right.
   * @returns Concatenated matrix.
   * @throws Error if row counts differ.
   */
  concatHorizontal(other: Matrix): Matrix {
    if (this._rows !== other.rows) {
      throw new Error("Matrix row counts must match");
    }

    const outCols = this._cols + other.cols;
    const out = new Array(this._rows * outCols);
    const otherData = other.data;

    for (let row = 0; row < this._rows; row++) {
      const outRowStart = row * outCols;
      const leftStart = row * this._cols;
      const rightStart = row * other.cols;
      for (let col = 0; col < this._cols; col++) {
        out[outRowStart + col] = this._data[leftStart + col];
      }
      for (let col = 0; col < other.cols; col++) {
        out[outRowStart + this._cols + col] = otherData[rightStart + col];
      }
    }
    return new Matrix(out, this._rows, outCols);
  }

  /**
   * Concatenates two matrices vertically.
   * @param other Matrix to append at the bottom.
   * @returns Concatenated matrix.
   * @throws Error if column counts differ.
   */
  concatVertical(other: Matrix): Matrix {
    if (this._cols !== other.cols) {
      throw new Error("Matrix column counts must match");
    }
    return new Matrix(
      [...this._data, ...other.data],
      this._rows + other.rows,
      this._cols,
    );
  }

  /**
   * Builds a block matrix from a 2D array of matrices.
   * @param blocks Block rows and columns.
   * @returns Block-composed matrix.
   * @throws Error if block layout is empty or dimensions are incompatible.
   */
  static block(blocks: Matrix[][]): Matrix {
    if (blocks.length === 0 || blocks[0].length === 0) {
      throw new Error("At least one block is required");
    }
    const blockCols = blocks[0].length;
    for (const row of blocks) {
      if (row.length !== blockCols) {
        throw new Error("All block rows must have the same number of blocks");
      }
    }

    const rowHeights = new Array(blocks.length);
    const colWidths = new Array(blockCols);

    for (let r = 0; r < blocks.length; r++) {
      rowHeights[r] = blocks[r][0].rows;
      for (let c = 1; c < blockCols; c++) {
        if (blocks[r][c].rows !== rowHeights[r]) {
          throw new Error("All blocks in a block-row must share row count");
        }
      }
    }

    for (let c = 0; c < blockCols; c++) {
      colWidths[c] = blocks[0][c].cols;
      for (let r = 1; r < blocks.length; r++) {
        if (blocks[r][c].cols !== colWidths[c]) {
          throw new Error(
            "All blocks in a block-column must share column count",
          );
        }
      }
    }

    const totalRows = rowHeights.reduce((acc, v) => acc + v, 0);
    const totalCols = colWidths.reduce((acc, v) => acc + v, 0);
    const out = new Array(totalRows * totalCols).fill(0);

    let rowOffset = 0;
    for (let br = 0; br < blocks.length; br++) {
      let colOffset = 0;
      for (let bc = 0; bc < blockCols; bc++) {
        const block = blocks[br][bc];
        const blockData = block.data;
        for (let r = 0; r < block.rows; r++) {
          const outRowStart = (rowOffset + r) * totalCols + colOffset;
          const blockRowStart = r * block.cols;
          for (let c = 0; c < block.cols; c++) {
            out[outRowStart + c] = blockData[blockRowStart + c];
          }
        }
        colOffset += block.cols;
      }
      rowOffset += blocks[br][0].rows;
    }

    return new Matrix(out, totalRows, totalCols);
  }

  /** returns a specific row of a matrix
   * @param row index of the row
   * @returns Array of the row elements
   * @example
   * ```ts
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.getRow(0)); // Output: [1, 2]
   * console.log(matrix.getRow(1)); // Output: [3, 4]
   * console.log(matrix.getRow(2)); // Output: Error: Invalid row
   * ```
   */
  getRow(row: number): number[] {
    if (row < 0 || row >= this._rows) {
      throw new Error("Invalid row");
    }
    return this._data.slice(row * this._cols, row * this._cols + this._cols);
  }

  /** returns a specific column of a matrix
   * @param col index of the column
   * @returns Array of the column elements
   * @example
   * ```ts
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.getColumn(0)); // Output: [1, 3]
   * console.log(matrix.getColumn(1)); // Output: [2, 4]
   * console.log(matrix.getColumn(2)); // Output: Error: Invalid column
   * ```
   */
  getColumn(col: number): number[] {
    if (col < 0 || col >= this._cols) {
      throw new Error("Invalid column");
    }
    return this._data.filter((_, index) => index % this._cols === col);
  }

  /**
   * Returns the number of rows in the matrix.
   * @returns Number of rows.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.rows); // Output: 2
   */
  get rows(): number {
    return this._rows;
  }

  /**
   * Returns the number of columns in the matrix.
   * @returns Number of columns.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.cols); // Output: 2
   */
  get cols(): number {
    return this._cols;
  }

  /**
   * Retrieves the element at a specified row and column.
   * @param row Row index of the element.
   * @param col Column index of the element.
   * @returns The element at the specified position.
   * @throws Error if the row or column is out of bounds.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.get(0, 1)); // Output: 2
   */
  get(row: number, col: number): number {
    if (row < 0 || row >= this._rows || col < 0 || col >= this._cols) {
      throw new Error("Invalid row or column");
    }
    return this._data[row * this._cols + col];
  }

  /**
   * Sets the element at a specified row and column to a new value.
   * @param row Row index where the element is located.
   * @param col Column index where the element is located.
   * @param value New value to set at the specified position.
   * @throws Error if the row or column is out of bounds or if the value is not a number.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * matrix.set(0, 1, 5);
   * console.log(matrix.get(0, 1)); // Output: 5
   */
  set(row: number, col: number, value: number): void {
    if (row < 0 || row >= this._rows || col < 0 || col >= this._cols) {
      throw new Error("Invalid row or column");
    }
    if (isNaN(value)) {
      throw new Error("Invalid value");
    }
    this._data[row * this._cols + col] = value;
  }

  /**
   * Calculates and returns the minor of a specified element in the matrix.
   * @param row Row index of the element.
   * @param col Column index of the element.
   * @returns A new matrix which is the minor of the specified element.
   * @throws Error if the row or column is out of bounds.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.minor(1, 1).data); // Output: [1]
   */
  minor(row: number, col: number): Matrix {
    if (row < 0 || row >= this._rows || col < 0 || col >= this._cols) {
      throw new Error("Invalid row or column");
    }
    const minorData = [];
    for (let r = 0; r < this._rows; r++) {
      if (r === row) continue; // Skip the current row
      for (let c = 0; c < this._cols; c++) {
        if (c === col) continue; // Skip the current column
        minorData.push(this._data[r * this._cols + c]);
      }
    }
    return new Matrix(minorData, this._rows - 1, this._cols - 1);
  }

  /**
   * Calculates and returns the cofactor of a specified element in the matrix.
   * @param row Row index of the element.
   * @param col Column index of the element.
   * @returns The cofactor of the specified element.
   * @throws Error if the matrix is not square.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.cofactor(0, 0)); // Output: 4
   */
  cofactor(row: number, col: number): number {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    const minor = this.minor(row, col);
    const sign = (row + col) % 2 === 0 ? 1 : -1;
    return sign * minor.determinant();
  }

  /**
   * Computes the determinant of the matrix.
   * @returns The determinant of the matrix.
   * @throws Error if the matrix is not square.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * console.log(matrix.determinant()); // Output: -2
   */
  determinant(): number {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }

    const n = this._rows;
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return this._data[0]; // Determinant of a 1x1 matrix is the element itself
    }
    if (n === 2) {
      return this._data[0] * this._data[3] - this._data[1] * this._data[2];
    }

    const data = [...this._data];
    let swaps = 0;
    let det = 1;

    for (let pivotCol = 0; pivotCol < n; pivotCol++) {
      let pivotRow = pivotCol;
      let maxAbs = Math.abs(data[pivotRow * n + pivotCol]);
      for (let row = pivotCol + 1; row < n; row++) {
        const valueAbs = Math.abs(data[row * n + pivotCol]);
        if (valueAbs > maxAbs) {
          maxAbs = valueAbs;
          pivotRow = row;
        }
      }

      if (maxAbs === 0) {
        return 0;
      }

      if (pivotRow !== pivotCol) {
        const pivotStart = pivotCol * n;
        const swapStart = pivotRow * n;
        for (let col = pivotCol; col < n; col++) {
          const tmp = data[pivotStart + col];
          data[pivotStart + col] = data[swapStart + col];
          data[swapStart + col] = tmp;
        }
        swaps++;
      }

      const pivot = data[pivotCol * n + pivotCol];
      det *= pivot;

      for (let row = pivotCol + 1; row < n; row++) {
        const rowStart = row * n;
        const factor = data[rowStart + pivotCol] / pivot;
        data[rowStart + pivotCol] = 0;
        for (let col = pivotCol + 1; col < n; col++) {
          data[rowStart + col] -= factor * data[pivotCol * n + col];
        }
      }
    }

    const result = swaps % 2 === 0 ? det : -det;
    return Matrix.normalizeNumber(result);
  }

  /**
   * Multiplies the matrix by a scalar value.
   * @param scalar The scalar value to multiply by.
   * @returns A new matrix that is the result of the multiplication.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * const scaledMatrix = matrix.multiply(2);
   * console.log(scaledMatrix.data); // Output: [2, 4, 6, 8]
   */
  multiply(scalar: number): Matrix {
    const data = this._data.map((value) => value * scalar);
    return new Matrix(data, this._rows, this._cols);
  }

  /**
   * Multiplies all matrix elements by a scalar value.
   * @param scalar Scalar value to multiply by.
   * @returns A new scaled matrix.
   * @example
   * ```ts
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * const scaled = matrix.scale(0.5);
   * // scaled.data = [0.5, 1, 1.5, 2]
   * ```
   */
  scale(scalar: number): Matrix {
    return this.multiply(scalar);
  }

  /**
   * Computes the element-wise (Hadamard) product with another matrix.
   * @param other Matrix with the same dimensions.
   * @returns Element-wise product matrix.
   * @throws Error if matrix dimensions differ.
   * @example
   * ```ts
   * const a = new Matrix([1, 2, 3, 4], 2, 2);
   * const b = new Matrix([2, 3, 4, 5], 2, 2);
   * const h = a.hadamard(b);
   * // h.data = [2, 6, 12, 20]
   * ```
   */
  hadamard(other: Matrix): Matrix {
    if (this._rows !== other.rows || this._cols !== other.cols) {
      throw new Error("Matrix dimensions must be the same");
    }

    const out = new Array(this._data.length);
    const otherData = other.data;
    for (let i = 0; i < this._data.length; i++) {
      out[i] = this._data[i] * otherData[i];
    }
    return new Matrix(out, this._rows, this._cols);
  }

  /**
   * Multiplies this matrix by a vector.
   * @param vector Vector with length equal to the number of columns.
   * @returns Resulting vector of length equal to the number of rows.
   * @throws Error if vector length does not match matrix columns.
   * @example
   * ```ts
   * const a = new Matrix([1, 2, 3, 4], 2, 2);
   * const y = a.matVec([5, 6]);
   * // y = [17, 39]
   * ```
   */
  matVec(vector: number[]): number[] {
    if (vector.length !== this._cols) {
      throw new Error(
        "Vector length must match the number of matrix columns",
      );
    }

    const result = new Array(this._rows).fill(0);
    for (let row = 0; row < this._rows; row++) {
      const rowStart = row * this._cols;
      let acc = 0;
      for (let col = 0; col < this._cols; col++) {
        acc += this._data[rowStart + col] * vector[col];
      }
      result[row] = Matrix.normalizeNumber(acc);
    }
    return result;
  }

  /**
   * Computes the sum of diagonal elements.
   * @returns Matrix trace.
   * @throws Error if the matrix is not square.
   * @example
   * ```ts
   * const a = new Matrix([1, 2, 3, 4], 2, 2);
   * a.trace(); // 5
   * ```
   */
  trace(): number {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    let sum = 0;
    for (let i = 0; i < this._rows; i++) {
      sum += this._data[i * this._cols + i];
    }
    return Matrix.normalizeNumber(sum);
  }

  /**
   * Computes the matrix 1-norm (maximum absolute column sum).
   * @returns The 1-norm.
   */
  norm1(): number {
    let maxColSum = 0;
    for (let col = 0; col < this._cols; col++) {
      let colSum = 0;
      for (let row = 0; row < this._rows; row++) {
        colSum += Math.abs(this._data[row * this._cols + col]);
      }
      if (colSum > maxColSum) {
        maxColSum = colSum;
      }
    }
    return maxColSum;
  }

  /**
   * Computes the matrix infinity-norm (maximum absolute row sum).
   * @returns The infinity-norm.
   */
  normInf(): number {
    let maxRowSum = 0;
    for (let row = 0; row < this._rows; row++) {
      const rowStart = row * this._cols;
      let rowSum = 0;
      for (let col = 0; col < this._cols; col++) {
        rowSum += Math.abs(this._data[rowStart + col]);
      }
      if (rowSum > maxRowSum) {
        maxRowSum = rowSum;
      }
    }
    return maxRowSum;
  }

  /**
   * Computes the Frobenius norm (square root of the sum of squared entries).
   * @returns The Frobenius norm.
   */
  frobeniusNorm(): number {
    let sumSquares = 0;
    for (let i = 0; i < this._data.length; i++) {
      sumSquares += this._data[i] * this._data[i];
    }
    return Math.sqrt(sumSquares);
  }

  /**
   * Computes the matrix condition number in 1-norm.
   * @returns Condition number `||A||_1 * ||A^{-1}||_1`.
   * @throws Error if the matrix is not square or invertible.
   */
  conditionNumber1(): number {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    return this.norm1() * this.getInverse().norm1();
  }

  /**
   * Computes the matrix condition number in infinity-norm.
   * @returns Condition number `||A||_inf * ||A^{-1}||_inf`.
   * @throws Error if the matrix is not square or invertible.
   */
  conditionNumberInf(): number {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    return this.normInf() * this.getInverse().normInf();
  }

  /**
   * Compares two matrices using an absolute tolerance.
   * @param other Matrix to compare.
   * @param epsilon Absolute tolerance, defaults to `1e-9`.
   * @returns `true` if dimensions match and all entries are within tolerance.
   */
  equalsApprox(other: Matrix, epsilon: number = 1e-9): boolean {
    if (this._rows !== other.rows || this._cols !== other.cols) {
      return false;
    }
    if (epsilon < 0) {
      throw new Error("Epsilon must be non-negative");
    }
    const otherData = other.data;
    for (let i = 0; i < this._data.length; i++) {
      if (Math.abs(this._data[i] - otherData[i]) > epsilon) {
        return false;
      }
    }
    return true;
  }

  /**
   * Calculates and returns the transpose of the matrix.
   * @returns A new matrix that is the transpose of this matrix.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * const transposedMatrix = matrix.getTranspose();
   * console.log(transposedMatrix.data); // Output: [1, 3, 2, 4]
   */
  getTranspose(): Matrix {
    const data = this._data.map((_, index) => {
      const row = Math.floor(index / this._cols);
      const col = index % this._cols;
      return this.get(col, row);
    });
    return new Matrix(data, this._cols, this._rows);
  }

  /**
   * Inverts the current matrix if it is square and invertible.
   * @throws Error if the matrix is not square or is not invertible.
   * @example
   * const matrix = new Matrix([4, 7, 2, 6], 2, 2);
   * matrix.invert();
   * console.log(matrix.data); // Output: [-0.6, 0.7, 0.2, -0.4] Adjust values as necessary based on actual calculation
   */
  invert(): void {
    const inverse = this.getInverse();
    this._data = inverse.data; // Replace current matrix data with inverse matrix data
  }

  /**
   * Calculates and returns the inverse of the matrix.
   * @returns A new matrix that is the inverse of this matrix.
   * @throws Error if the matrix is not square or is not invertible.
   * @example
   * const matrix = new Matrix([4, 7, 2, 6], 2, 2);
   * const inverseMatrix = matrix.getInverse();
   * console.log(inverseMatrix.data); // Output: [-0.6, 0.7, 0.2, -0.4] Adjust values as necessary based on actual calculation
   */

  getInverse(): Matrix {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }

    const n = this._rows;
    if (n === 0) {
      throw new Error("Matrix is not invertible");
    }
    const epsilon = 1e-10;
    const left = [...this._data];
    const right = Matrix.createIdentity(n).data;

    for (let pivotCol = 0; pivotCol < n; pivotCol++) {
      let pivotRow = pivotCol;
      let maxAbs = Math.abs(left[pivotRow * n + pivotCol]);
      for (let row = pivotCol + 1; row < n; row++) {
        const valueAbs = Math.abs(left[row * n + pivotCol]);
        if (valueAbs > maxAbs) {
          maxAbs = valueAbs;
          pivotRow = row;
        }
      }

      if (maxAbs < epsilon) {
        throw new Error("Matrix is not invertible");
      }

      if (pivotRow !== pivotCol) {
        const pivotStart = pivotCol * n;
        const swapStart = pivotRow * n;

        for (let col = 0; col < n; col++) {
          const leftTmp = left[pivotStart + col];
          left[pivotStart + col] = left[swapStart + col];
          left[swapStart + col] = leftTmp;

          const rightTmp = right[pivotStart + col];
          right[pivotStart + col] = right[swapStart + col];
          right[swapStart + col] = rightTmp;
        }
      }

      const pivotIndex = pivotCol * n + pivotCol;
      const pivot = left[pivotIndex];

      for (let col = 0; col < n; col++) {
        left[pivotCol * n + col] /= pivot;
        right[pivotCol * n + col] /= pivot;
      }

      for (let row = 0; row < n; row++) {
        if (row === pivotCol) {
          continue;
        }
        const factor = left[row * n + pivotCol];
        if (factor === 0) {
          continue;
        }
        for (let col = 0; col < n; col++) {
          left[row * n + col] -= factor * left[pivotCol * n + col];
          right[row * n + col] -= factor * right[pivotCol * n + col];
        }
      }
    }

    const inverseData = right.map((value) => Matrix.normalizeNumber(value));
    return new Matrix(inverseData, n, n);
  }

  /**
   * Computes Cholesky factorization for symmetric positive-definite matrices.
   * @param epsilon Numerical tolerance used for positivity checks.
   * @returns Lower-triangular matrix `L` such that `A = L * L^T`.
   * @throws Error if the matrix is not square.
   * @throws Error if the matrix is not symmetric positive-definite.
   */
  cholesky(epsilon: number = 1e-10): Matrix {
    if (epsilon < 0) {
      throw new Error("Epsilon must be non-negative");
    }
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    if (!this.isSymmetric(epsilon)) {
      throw new Error("Matrix must be symmetric");
    }

    const n = this._rows;
    const l = new Array(n * n).fill(0);

    for (let row = 0; row < n; row++) {
      for (let col = 0; col <= row; col++) {
        let sum = this._data[row * n + col];
        for (let k = 0; k < col; k++) {
          sum -= l[row * n + k] * l[col * n + k];
        }

        if (row === col) {
          if (sum <= epsilon) {
            throw new Error("Matrix is not positive definite");
          }
          l[row * n + col] = Math.sqrt(sum);
        } else {
          l[row * n + col] = sum / l[col * n + col];
        }
      }
    }

    return new Matrix(l.map((value) => Matrix.normalizeNumber(value)), n, n);
  }

  /**
   * Checks whether a matrix is positive definite.
   * @param epsilon Numerical tolerance used for positivity checks.
   * @returns `true` when Cholesky factorization succeeds.
   */
  isPositiveDefinite(epsilon: number = 1e-10): boolean {
    try {
      this.cholesky(epsilon);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Computes an LU decomposition with partial pivoting.
   * @param epsilon Pivot threshold to detect singularity. Defaults to `1e-10`.
   * @returns LU decomposition `{ L, U, P, pivotSign }` such that `P * A = L * U`.
   * @throws Error if the matrix is not square.
   * @throws Error if the matrix is singular.
   */
  lu(epsilon: number = 1e-10): LUDecomposition {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    if (epsilon < 0) {
      throw new Error("Epsilon must be non-negative");
    }

    const n = this._rows;
    const u = [...this._data];
    const l = Matrix.createIdentity(n).data;
    const p = Matrix.createIdentity(n).data;
    let pivotSign = 1;

    for (let col = 0; col < n; col++) {
      let pivotRow = col;
      let maxAbs = Math.abs(u[col * n + col]);
      for (let row = col + 1; row < n; row++) {
        const current = Math.abs(u[row * n + col]);
        if (current > maxAbs) {
          maxAbs = current;
          pivotRow = row;
        }
      }

      if (maxAbs < epsilon) {
        throw new Error("Matrix is singular");
      }

      if (pivotRow !== col) {
        const pivotStart = col * n;
        const swapStart = pivotRow * n;

        for (let j = 0; j < n; j++) {
          const tmpU = u[pivotStart + j];
          u[pivotStart + j] = u[swapStart + j];
          u[swapStart + j] = tmpU;

          const tmpP = p[pivotStart + j];
          p[pivotStart + j] = p[swapStart + j];
          p[swapStart + j] = tmpP;
        }

        for (let j = 0; j < col; j++) {
          const tmpL = l[pivotStart + j];
          l[pivotStart + j] = l[swapStart + j];
          l[swapStart + j] = tmpL;
        }

        pivotSign *= -1;
      }

      const pivot = u[col * n + col];
      for (let row = col + 1; row < n; row++) {
        const rowStart = row * n;
        const factor = u[rowStart + col] / pivot;
        l[rowStart + col] = factor;
        u[rowStart + col] = 0;
        for (let j = col + 1; j < n; j++) {
          u[rowStart + j] -= factor * u[col * n + j];
        }
      }
    }

    return {
      L: new Matrix(l.map((value) => Matrix.normalizeNumber(value)), n, n),
      U: new Matrix(u.map((value) => Matrix.normalizeNumber(value)), n, n),
      P: new Matrix(p, n, n),
      pivotSign,
    };
  }

  /**
   * Computes a reduced QR decomposition using modified Gram-Schmidt.
   * @param epsilon Threshold used to treat dependent vectors as zero. Defaults to `1e-10`.
   * @returns Reduced decomposition `{ Q, R }` such that `A = Q * R`.
   * @throws Error if epsilon is negative.
   */
  qr(epsilon: number = 1e-10): QRDecomposition {
    if (epsilon < 0) {
      throw new Error("Epsilon must be non-negative");
    }

    const m = this._rows;
    const n = this._cols;
    const kMax = Math.min(m, n);
    const q = new Array(m * kMax).fill(0);
    const r = new Array(kMax * n).fill(0);

    for (let k = 0; k < kMax; k++) {
      const v = new Array(m);
      for (let row = 0; row < m; row++) {
        v[row] = this._data[row * n + k];
      }

      for (let j = 0; j < k; j++) {
        let dot = 0;
        for (let row = 0; row < m; row++) {
          dot += q[row * kMax + j] * v[row];
        }
        r[j * n + k] = dot;
        for (let row = 0; row < m; row++) {
          v[row] -= dot * q[row * kMax + j];
        }
      }

      let normSq = 0;
      for (let row = 0; row < m; row++) {
        normSq += v[row] * v[row];
      }
      const norm = Math.sqrt(normSq);
      r[k * n + k] = norm;

      if (norm > epsilon) {
        for (let row = 0; row < m; row++) {
          q[row * kMax + k] = v[row] / norm;
        }
      }

      for (let col = k + 1; col < n; col++) {
        let dot = 0;
        for (let row = 0; row < m; row++) {
          dot += q[row * kMax + k] * this._data[row * n + col];
        }
        r[k * n + col] = dot;
      }
    }

    return {
      Q: new Matrix(q.map((value) => Matrix.normalizeNumber(value)), m, kMax),
      R: new Matrix(r.map((value) => Matrix.normalizeNumber(value)), kMax, n),
    };
  }

  /**
   * Computes the numerical rank of the matrix.
   * @param epsilon Pivot threshold used to count non-zero rows. Defaults to `1e-10`.
   * @returns Numerical rank.
   */
  rank(epsilon: number = 1e-10): number {
    if (epsilon < 0) {
      throw new Error("Epsilon must be non-negative");
    }

    const rows = this._rows;
    const cols = this._cols;
    const data = [...this._data];
    let rank = 0;
    let pivotRow = 0;

    for (let pivotCol = 0; pivotCol < cols && pivotRow < rows; pivotCol++) {
      let bestRow = pivotRow;
      let maxAbs = Math.abs(data[bestRow * cols + pivotCol]);
      for (let row = pivotRow + 1; row < rows; row++) {
        const current = Math.abs(data[row * cols + pivotCol]);
        if (current > maxAbs) {
          maxAbs = current;
          bestRow = row;
        }
      }

      if (maxAbs <= epsilon) {
        continue;
      }

      if (bestRow !== pivotRow) {
        const aStart = pivotRow * cols;
        const bStart = bestRow * cols;
        for (let col = 0; col < cols; col++) {
          const tmp = data[aStart + col];
          data[aStart + col] = data[bStart + col];
          data[bStart + col] = tmp;
        }
      }

      const pivot = data[pivotRow * cols + pivotCol];
      for (let row = pivotRow + 1; row < rows; row++) {
        const rowStart = row * cols;
        const factor = data[rowStart + pivotCol] / pivot;
        data[rowStart + pivotCol] = 0;
        for (let col = pivotCol + 1; col < cols; col++) {
          data[rowStart + col] -= factor * data[pivotRow * cols + col];
        }
      }

      rank++;
      pivotRow++;
    }

    return rank;
  }

  /**
   * Solves a linear system `A * x = b`.
   * @param b Right-hand side vector (`number[]`) or matrix (`Matrix`).
   * @returns A solution vector or matrix with matching shape to `b`.
   * @throws Error if the matrix is not square.
   * @throws Error if dimensions of `b` do not match matrix rows.
   * @throws Error if the matrix is singular.
   */
  solve(b: number[]): number[];
  solve(b: Matrix): Matrix;
  solve(b: number[] | Matrix): number[] | Matrix {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }

    const n = this._rows;
    const { L, U, P } = this.lu();
    const l = L.data;
    const u = U.data;
    const p = P.data;

    const solveOne = (rhs: number[]): number[] => {
      if (rhs.length !== n) {
        throw new Error("Right-hand side vector length must match matrix rows");
      }

      const pb = new Array(n).fill(0);
      for (let row = 0; row < n; row++) {
        let acc = 0;
        for (let col = 0; col < n; col++) {
          acc += p[row * n + col] * rhs[col];
        }
        pb[row] = acc;
      }

      const y = new Array(n).fill(0);
      for (let row = 0; row < n; row++) {
        let acc = pb[row];
        for (let col = 0; col < row; col++) {
          acc -= l[row * n + col] * y[col];
        }
        y[row] = acc;
      }

      const x = new Array(n).fill(0);
      for (let row = n - 1; row >= 0; row--) {
        let acc = y[row];
        for (let col = row + 1; col < n; col++) {
          acc -= u[row * n + col] * x[col];
        }
        x[row] = acc / u[row * n + row];
      }

      return x.map((value) => Matrix.normalizeNumber(value));
    };

    if (Array.isArray(b)) {
      return solveOne(b);
    }

    if (b.rows !== n) {
      throw new Error("Right-hand side matrix rows must match matrix rows");
    }

    const rhsCols = b.cols;
    const rhsData = b.data;
    const out = new Array(n * rhsCols).fill(0);

    for (let col = 0; col < rhsCols; col++) {
      const rhsCol = new Array(n);
      for (let row = 0; row < n; row++) {
        rhsCol[row] = rhsData[row * rhsCols + col];
      }
      const solved = solveOne(rhsCol);
      for (let row = 0; row < n; row++) {
        out[row * rhsCols + col] = solved[row];
      }
    }

    return new Matrix(out, n, rhsCols);
  }

  /**
   * Solves the least-squares problem `min_x ||A x - b||_2` using QR decomposition.
   * @param b Right-hand side vector (`number[]`) or matrix (`Matrix`).
   * @param epsilon Threshold for rank checks and numerical stability.
   * @returns Least-squares solution with shape matching `b`.
   * @throws Error if the system is underdetermined (`rows < cols`).
   * @throws Error if right-hand side dimensions are incompatible.
   * @throws Error if the matrix is rank deficient.
   */
  solveLeastSquares(b: number[], epsilon?: number): number[];
  solveLeastSquares(b: Matrix, epsilon?: number): Matrix;
  solveLeastSquares(
    b: number[] | Matrix,
    epsilon: number = 1e-10,
  ): number[] | Matrix {
    if (epsilon < 0) {
      throw new Error("Epsilon must be non-negative");
    }
    if (this._rows < this._cols) {
      throw new Error("Least squares requires rows >= cols");
    }

    const m = this._rows;
    const n = this._cols;
    const { Q, R } = this.qr(epsilon);
    const qData = Q.data; // m x n
    const rData = R.data; // n x n

    const solveUpper = (rhs: number[]): number[] => {
      const y = new Array(n).fill(0);
      for (let col = 0; col < n; col++) {
        let dot = 0;
        for (let row = 0; row < m; row++) {
          dot += qData[row * n + col] * rhs[row];
        }
        y[col] = dot;
      }

      const x = new Array(n).fill(0);
      for (let row = n - 1; row >= 0; row--) {
        const diag = rData[row * n + row];
        if (Math.abs(diag) <= epsilon) {
          throw new Error("Matrix is rank deficient");
        }
        let acc = y[row];
        for (let col = row + 1; col < n; col++) {
          acc -= rData[row * n + col] * x[col];
        }
        x[row] = acc / diag;
      }
      return x.map((value) => Matrix.normalizeNumber(value));
    };

    if (Array.isArray(b)) {
      if (b.length !== m) {
        throw new Error("Right-hand side vector length must match matrix rows");
      }
      return solveUpper(b);
    }

    if (b.rows !== m) {
      throw new Error("Right-hand side matrix rows must match matrix rows");
    }

    const out = new Array(n * b.cols).fill(0);
    const rhsData = b.data;
    for (let col = 0; col < b.cols; col++) {
      const rhsCol = new Array(m);
      for (let row = 0; row < m; row++) {
        rhsCol[row] = rhsData[row * b.cols + col];
      }
      const solved = solveUpper(rhsCol);
      for (let row = 0; row < n; row++) {
        out[row * b.cols + col] = solved[row];
      }
    }
    return new Matrix(out, n, b.cols);
  }

  /**
   * Computes the dominant eigenpair using power iteration.
   * @param maxIterations Maximum number of iterations.
   * @param tolerance Convergence tolerance on residual norm.
   * @returns Dominant eigenvalue/vector approximation and iteration count.
   * @throws Error if the matrix is not square.
   * @throws Error if iteration does not converge within the iteration budget.
   */
  eigenPowerIteration(
    maxIterations: number = 1000,
    tolerance: number = 1e-10,
  ): EigenPowerIterationResult {
    if (this._rows !== this._cols) {
      throw new Error("Matrix must be square");
    }
    if (!Number.isInteger(maxIterations) || maxIterations <= 0) {
      throw new Error("maxIterations must be a positive integer");
    }
    if (tolerance <= 0) {
      throw new Error("tolerance must be positive");
    }

    const n = this._rows;
    let vector = new Array(n).fill(1 / Math.sqrt(n));
    let eigenvalue = 0;

    for (let iteration = 1; iteration <= maxIterations; iteration++) {
      const av = this.matVec(vector);
      let normSq = 0;
      for (let i = 0; i < n; i++) {
        normSq += av[i] * av[i];
      }
      const norm = Math.sqrt(normSq);
      if (norm === 0) {
        return { eigenvalue: 0, eigenvector: vector, iterations: iteration };
      }

      const nextVector = new Array(n);
      for (let i = 0; i < n; i++) {
        nextVector[i] = av[i] / norm;
      }

      const avNext = this.matVec(nextVector);
      let lambda = 0;
      for (let i = 0; i < n; i++) {
        lambda += nextVector[i] * avNext[i];
      }

      let residualSq = 0;
      for (let i = 0; i < n; i++) {
        const residual = avNext[i] - lambda * nextVector[i];
        residualSq += residual * residual;
      }
      const residualNorm = Math.sqrt(residualSq);

      vector = nextVector;
      eigenvalue = lambda;

      if (residualNorm <= tolerance) {
        return {
          eigenvalue: Matrix.normalizeNumber(eigenvalue),
          eigenvector: vector.map((v) => Matrix.normalizeNumber(v)),
          iterations: iteration,
        };
      }
    }

    throw new Error("Power iteration did not converge");
  }

  /**
   * Transposes the current matrix in-place.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * matrix.transpose();
   * console.log(matrix.data); // Output: [1, 3, 2, 4]
   */
  transpose(): void {
    this._data = this.getTranspose().data;
    [this._rows, this._cols] = [this._cols, this._rows];
  }

  /**
   * Clones the matrix and returns a new instance with the same data.
   * @returns A new matrix with the same data as this one.
   * @example
   * const matrix = new Matrix([1, 2, 3, 4], 2, 2);
   * const clonedMatrix = matrix.clone();
   * console.log(clonedMatrix.data); // Output: [1, 2, 3, 4]
   */
  clone(): Matrix {
    return new Matrix([...this._data], this._rows, this._cols);
  }
}
