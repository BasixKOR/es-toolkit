import { ary as aryToolkit } from '../../function/ary.ts';

/**
 * Creates a function that invokes func, with up to `n` arguments, ignoring any additional arguments.
 * If `n` is not provided, it defaults to the function's length.
 *
 * @param {Function} func - The function to cap arguments for.
 * @param {number} [n] - The arity cap. Defaults to func.length.
 * @returns {Function} Returns the new capped function.
 *
 * @example
 * function fn(a: number, b: number, c: number) {
 *   return Array.from(arguments);
 * }
 *
 * // Cap at 2 arguments
 * const capped = ary(fn, 2);
 * capped(1, 2, 3); // [1, 2]
 *
 * // Default to function length
 * const defaultCap = ary(fn);
 * defaultCap(1, 2, 3); // [1, 2, 3]
 */
export function ary(func: (...args: any[]) => any, n?: number): (...args: any[]) => any;

/**
 * Creates a function that invokes func, with up to `n` arguments, ignoring any additional arguments.
 *
 * @template F - The type of the function.
 * @param {F} func - The function to cap arguments for.
 * @param {number} n - The arity cap.
 * @param {unknown} guard - The value to guard the arity cap.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new capped function.
 *
 * @example
 * function fn(a: number, b: number, c: number) {
 *   return Array.from(arguments);
 * }
 *
 * ary(fn, 0)(1, 2, 3); // []
 * ary(fn, 1)(1, 2, 3); // [1]
 * ary(fn, 2)(1, 2, 3); // [1, 2]
 * ary(fn, 3)(1, 2, 3); // [1, 2, 3]
 */
export function ary<F extends (...args: any[]) => any>(
  func: F,
  n: number = func.length,
  guard?: unknown
): (...args: any[]) => ReturnType<F> {
  if (guard) {
    n = func.length;
  }

  if (Number.isNaN(n) || n < 0) {
    n = 0;
  }

  return aryToolkit(func, n);
}
