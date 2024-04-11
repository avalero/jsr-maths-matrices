/**
 * Represents a matrix for linear algebra operations.
 * @module Matrix
 */
export class Matrix {
  private _data: number[];
  private _rows: number;
  private _cols: number;

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
    const minorDeterminant = minor.determinant();
    console.log(
      `Minor Determinant: ${minorDeterminant}, Sign: ${sign}, Row: ${row}, Col: ${col}`
    );
    return sign * minorDeterminant;
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
    if (this._rows === 1) {
      return this._data[0]; // Determinant of a 1x1 matrix is the element itself
    }
    if (this._rows === 2) {
      return this._data[0] * this._data[3] - this._data[1] * this._data[2];
    }
    // For matrices larger than 2x2, you would normally use recursion or another method to compute the determinant
    let det = 0;
    for (let i = 0; i < this._cols; i++) {
      det += this.get(0, i) * this.cofactor(0, i);
    }
    return det;
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
    const det = this.determinant();
    if (Math.abs(det) < 1e-10) {
      // Use a tolerance for near-zero determinants
      throw new Error("Matrix is not invertible");
    }

    let cofactors = new Array(this._rows * this._cols);
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        cofactors[row * this._cols + col] = this.cofactor(row, col);
      }
    }

    // Forming the adjugate (transpose of the cofactor matrix)
    let adjugate = new Array(this._rows * this._cols);
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        adjugate[col * this._rows + row] = cofactors[row * this._cols + col];
      }
    }

    // Dividing the adjugate matrix elements by the determinant
    let inverseData = adjugate.map((value) => value / det);
    return new Matrix(inverseData, this._rows, this._cols);
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
