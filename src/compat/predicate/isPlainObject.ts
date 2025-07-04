/**
 * Checks if a given value is a plain object.
 *
 * A plain object is an object created by the `{}` literal, `new Object()`, or
 * `Object.create(null)`.
 *
 * This function also handles objects with custom
 * `Symbol.toStringTag` properties.
 *
 * `Symbol.toStringTag` is a built-in symbol that a constructor can use to customize the
 * default string description of objects.
 *
 * @param {any} [object] - The value to check.
 * @returns {boolean} - True if the value is a plain object, otherwise false.
 *
 * @example
 * console.log(isPlainObject({})); // true
 * console.log(isPlainObject([])); // false
 * console.log(isPlainObject(null)); // false
 * console.log(isPlainObject(Object.create(null))); // true
 * console.log(isPlainObject(new Map())); // false
 */
export function isPlainObject(object?: any): boolean {
  if (typeof object !== 'object') {
    return false;
  }

  if (object == null) {
    return false;
  }

  if (Object.getPrototypeOf(object) === null) {
    return true;
  }

  if (Object.prototype.toString.call(object) !== '[object Object]') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tag = object[Symbol.toStringTag];

    if (tag == null) {
      return false;
    }

    const isTagReadonly = !Object.getOwnPropertyDescriptor(object, Symbol.toStringTag)?.writable;

    if (isTagReadonly) {
      return false;
    }

    return object.toString() === `[object ${tag}]`;
  }

  let proto = object;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(object) === proto;
}
