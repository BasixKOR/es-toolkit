import { describe, expect, expectTypeOf, it } from 'vitest';
import type { isWeakMap as isWeakMapLodash } from 'lodash';
import { isWeakMap } from './isWeakMap';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';

describe('isWeakMap', () => {
  it('should return `true` for weak maps', () => {
    if (WeakMap) {
      expect(isWeakMap(new WeakMap())).toBe(true);
    }
  });

  it('should return `false` for non weak maps', () => {
    expect(falsey.map((value, index) => (index ? isWeakMap(value) : isWeakMap()))).toEqual(falsey.map(() => false));
    expect(isWeakMap(args)).toBe(false);
    expect(isWeakMap([1, 2, 3])).toBe(false);
    expect(isWeakMap(true)).toBe(false);
    expect(isWeakMap(new Date())).toBe(false);
    expect(isWeakMap(new Error())).toBe(false);
    expect(isWeakMap(slice)).toBe(false);
    expect(isWeakMap({ a: 1 })).toBe(false);
    expect(isWeakMap(Array.prototype.map)).toBe(false);
    expect(isWeakMap(1)).toBe(false);
    expect(isWeakMap(/x/)).toBe(false);
    expect(isWeakMap('a')).toBe(false);
    expect(isWeakMap(symbol)).toBe(false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', () => {
    expect(isWeakMap({ constructor: false })).toBe(false);
    expect(isWeakMap({ constructor: true })).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isWeakMap).toEqualTypeOf<typeof isWeakMapLodash>();
  });
});
