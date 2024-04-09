/**
 * This module contains functions for basic mathematical operations.
 * @packageDocumentation
 * @module Maths
 */

/**
 * Compute maximum of an array of numbers
 * @param arr Array of numbers
 * @returns maximum number in the array
 * @example max([1, 2, 3, 4, 7]) // 7
 */
export function max(arr: number[]): number {
  return arr.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
}

/**
 * Compute minimum of an array of numbers
 * @param arr Array of numbers
 * @returns minimum number in the array
 * @example min([1, 2, 3, 4, 7]) // 1
 */
export function min(arr: number[]): number {
  return arr.reduce((acc, curr) => Math.min(acc, curr), Infinity);
}

/**
 * Compute sum of an array of numbers
 * @param arr Array of numbers
 * @returns sum of numbers in the array
 * @example sum([1, 2, 3, 4, 7]) // 17
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Compute product of an array of numbers
 * @param arr Array of numbers
 * @returns product of numbers in the array
 * @example product([1, 2, 3, 4, 7]) // 168
 */
export function product(arr: number[]): number {
  return arr.reduce((acc, curr) => acc * curr, 1);
}
