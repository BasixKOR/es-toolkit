import { toArray } from '../_internal/toArray.ts';
import { negate } from '../function/negate.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Creates a slice of array.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to process.
 * @returns {T[]} - A slice of the array or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * const items = [1, 2, 3];
 * const result = takeWhile(items);
 * console.log(result); // [1, 2, 3]
 *
 * const result2 = takeWhile(null);
 * console.log(result2); // []
 */
export function takeWhile<T>(array: ArrayLike<T> | null | undefined): T[];

/**
 * Creates a slice of array with elements taken from the beginning until the predicate function returns falsey.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to process.
 * @param {(item: T, index: number, array: T[]) => unknown} predicate - A function invoked per iteration. Returns a truthy value to continue taking elements.
 * @returns {T[]} - A slice of the array with elements taken from the beginning or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * const items = [1, 2, 3, 4, 5];
 * const result = takeWhile(items, (item) => item < 3);
 * console.log(result); // [1, 2]
 */
export function takeWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, array: T[]) => unknown
): T[];

/**
 * Creates a slice of array with elements taken from the beginning until the element does not match the given object.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to process.
 * @param {Partial<T>} matches - A partial object that specifies the properties to match.
 * @returns {T[]} - A slice of the array with elements taken from the beginning or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * const items = [{ id: 30 }, { id: 20 }, { id: 10 }];
 * const result = takeWhile(items, { id: 30 });
 * console.log(result); // [{ id: 30 }]
 */
export function takeWhile<T>(array: ArrayLike<T> | null | undefined, matches: Partial<T>): T[];

/**
 * Creates a slice of array with elements taken from the beginning until the element does not match the given property key and value.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to process.
 * @param {[keyof T, unknown]} matchesProperty - An array where the first element is the property key and the second element is the value to match.
 * @returns {T[]} - A slice of the array with elements taken from the beginning or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * const items = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }];
 * const result = takeWhile(items, ['name', 'Alice']);
 * console.log(result); // [{ name: 'Alice' }]
 */
export function takeWhile<T>(array: ArrayLike<T> | null | undefined, matchesProperty: [keyof T, unknown]): T[];

/**
 * Creates a slice of array with elements taken from the beginning until the element does not have a truthy value for the given property key.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to process.
 * @param {PropertyKey} property - A property key. Elements are included if they have a truthy value for this key.
 * @returns {T[]} - A slice of the array with elements taken from the beginning or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * const items = [{ valid: true }, { valid: true }, { valid: false }];
 * const result = takeWhile(items, 'valid');
 * console.log(result); // [{ valid: true }, { valid: true }]
 */
export function takeWhile<T>(array: ArrayLike<T> | null | undefined, property: PropertyKey): T[];

/**
 * Creates a slice of the array with elements taken from the beginning while the specified predicate is satisfied.
 * If no predicate is provided, the identity function is used by default.
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to process.
 * @param {(item: T, index: number, array: T[]) => unknown | Partial<T> | [keyof T, unknown] | PropertyKey} [predicate] - The condition used to determine elements to include. Can be:
 * - A function invoked per iteration.
 * - A partial object to match properties.
 * - A key-value pair as a tuple.
 * - A property key to check for truthy values.
 * Defaults to the identity function if not provided.
 * @returns {T[]} - A slice of the array with elements taken from the beginning or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = takeWhile(items, (item) => item < 3);
 * console.log(result); // [1, 2]
 *
 * // Using a partial object
 * const items2 = [{ id: 30 }, { id: 20 }, { id: 10 }];
 * const result2 = takeWhile(items2, { id: 30 });
 * console.log(result2); // [{ id: 30 }]
 *
 * // Using a key-value pair
 * const items3 = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }];
 * const result3 = takeWhile(items3, ['name', 'Alice']);
 * console.log(result3); // [{ name: 'Alice' }]
 *
 * // Using a property key
 * const items4 = [{ active: true }, { active: true }, { active: false }];
 * const result4 = takeWhile(items4, 'active');
 * console.log(result4); // [{ active: true }, { active: true }]
 *
 * // No predicate provided
 * const items5 = [true, false];
 * const result5 = takeWhile(items5);
 * console.log(result5); // [true]
 *
 * // null or undefined array
 * const result6 = takeWhile(null);
 * console.log(result6); // []
 **/
export function takeWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate?:
    | ((value: T, index: number, array: ArrayLike<T>) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey
): T[] {
  if (!isArrayLikeObject(array)) {
    return [];
  }

  const _array = toArray(array);
  const index = _array.findIndex(negate(iteratee(predicate)));

  return index === -1 ? _array : _array.slice(0, index);
}
