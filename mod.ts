/**
 * This file is the entry point for the module.
 * It exports all the functions from the files in the module.
 * @packageDocumentation
 * @module Mod
 */

/**
 * Export all the functions from the files in the module Stats.
 * @module Stats
 */
export * as Stats from "./stats/mod.ts";

/**
 * Export all the functions from the files in the module Matrix.
 * @module Matrix
 * @preferred
 */
export * as Matrix from "./matrix/mod.ts";

/**
 * Export all the functions from the files in the module.
 * @module Maths
 */
export * from "./basics/mod.ts";
