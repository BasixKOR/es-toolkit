import type { MutableList } from '../_internal/MutableList.d.ts';
import type { RejectReadonly } from '../_internal/RejectReadonly.d.ts';

/**
 * Reverses `array` so that the first element becomes the last, the second element becomes the second to last, and so on.
 *
 * @template L
 * @param {L extends readonly any[] ? never : L} array - The array to reverse.
 * @returns {L} Returns `array`.
 *
 * @example
 * const array = [1, 2, 3];
 * reverse(array);
 * // => [3, 2, 1]
 */
export function reverse<L extends MutableList<any>>(array: RejectReadonly<L>): L;

/**
 * Reverses the elements of an array in place.
 *
 * This function takes an array and reverses its elements in place, modifying the original array.
 * If the input is `null` or `undefined`, it returns the input as is.
 *
 * @template T - The type of elements in the array.
 * @param {T[] | null | undefined} array - The array to reverse. If `null` or `undefined`, the input is returned as is.
 * @returns {T[] | null | undefined} The reversed array, or `null`/`undefined` if the input was `null`/`undefined`.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const reversedArray = reverse(array);
 * // reversedArray is [5, 4, 3, 2, 1], and array is also modified to [5, 4, 3, 2, 1].
 *
 * const emptyArray = reverse([]);
 * // emptyArray is [].
 *
 * const nullArray = reverse(null);
 * // nullArray is null.
 */
export function reverse<T>(array: T[] | null | undefined): T[] | null | undefined {
  if (array == null) {
    return array;
  }

  return array.reverse();
}
