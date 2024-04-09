/**
 * This file is the entry point for the module.
 * It exports all the functions from the files in the module.
 * @packageDocumentation
 * @module Mod
 */

/**
 * Export all the functions from the files in the module Stats.
 * Includes: average, variance, stdDev, median, mode, range.
 * @module Stats
 */
export * as Stats from "./stats.ts";

/**
 * Export all the functions from the files in the module.
 * Includes: max, min.
 * @module Maths
 */
export { max, min } from "./maths.ts";
