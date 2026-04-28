# `@maths/matrix`

Matrix utilities for linear algebra in TypeScript, published on JSR.

## Install

```bash
deno add jsr:@maths/matrix
```

## Use

```ts
import {
  block,
  cholesky,
  concatHorizontal,
  concatVertical,
  conditionNumber1,
  conditionNumberInf,
  determinant,
  diag,
  eigenPowerIteration,
  equalsApprox,
  frobeniusNorm,
  fromDiagonal,
  hadamard,
  invert,
  isPositiveDefinite,
  isSymmetric,
  lu,
  Matrix,
  matVec,
  multiply,
  norm1,
  normInf,
  qr,
  rank,
  scale,
  solve,
  solveLeastSquares,
  trace,
} from "jsr:@maths/matrix";

const a = new Matrix([4, 7, 2, 6], 2, 2);
const b = new Matrix([1, 0, 0, 1], 2, 2);

const c = multiply(a, b);
const det = determinant(a);
const inv = invert(a);
const x = solve(a, [1, 0]);
const ls = solveLeastSquares(new Matrix([1, 1, 1, 2, 1, 3], 3, 2), [1, 2, 2]);
```

## API Highlights

- Core class: `Matrix`
- Basic ops: `add`, `substract`, `multiply`, `transpose`, `determinant`,
  `invert`
- Decompositions: `lu`, `qr`, `cholesky`
- Solvers: `solve`, `solveLeastSquares`
- Numerical utilities: `rank`, `trace`, `norm1`, `normInf`, `frobeniusNorm`,
  `conditionNumber1`, `conditionNumberInf`
- Spectral tools: `eigenPowerIteration`
- Matrix structure checks: `isSymmetric`, `isPositiveDefinite`
- Structural ops: `diag`, `fromDiagonal`, `concatHorizontal`, `concatVertical`,
  `block`
- Element-wise/vector ops: `hadamard`, `matVec`, `scale`
- Comparison helper: `equalsApprox`

## Documentation Notes For JSR

- Public docs are generated from JSDoc comments on exported symbols.
- All public APIs are re-exported from the default entrypoint (`mod.ts`) so they
  appear in the default package docs sidebar.
- You can preview generated docs locally with:

```bash
deno doc --html mod.ts
```

## Contributing

Contributions are welcome through pull requests.
