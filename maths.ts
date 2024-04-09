/**
 * This module contains functions for basic mathematical operations.
 * @packageDocumentation
 * @module Maths
 */

/**
 * Compute maximum of an array of numbers
 * @param arr Array of numbers
 * @returns maximum number in the array
 */
export function max(arr: number[]): number {
  return arr.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
}

/**
 * Compute minimum of an array of numbers
 * @param arr Array of numbers
 * @returns minimum number in the array
 */
export function min(arr: number[]): number {
  return arr.reduce((acc, curr) => Math.min(acc, curr), Infinity);
}
