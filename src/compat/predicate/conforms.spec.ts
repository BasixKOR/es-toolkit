import { describe, expect, expectTypeOf, it } from 'vitest';
import type { conforms as conformsLodash } from 'lodash';
import { conforms } from './conforms';

describe('conforms', () => {
  it(`\`conforms\` should check if \`object\` conforms to \`source\``, () => {
    const objects = [
      { a: 1, b: 8 },
      { a: 2, b: 4 },
      { a: 3, b: 16 },
    ];

    let par: any = conforms({
      b: (value: number) => value > 4,
    });

    let actual = objects.filter(par);
    expect(actual).toEqual([objects[0], objects[2]]);

    par = conforms({
      b: (value: number) => value > 8,
      a: (value: number) => value > 1,
    });

    actual = objects.filter(par);
    expect(actual).toEqual([objects[2]]);
  });

  it(`\`conforms\` should not match by inherited \`source\` properties`, () => {
    class Foo {
      [key: PropertyKey]: (value: number) => boolean;
      constructor() {
        this.a = function (value: number) {
          return value > 1;
        };
      }
      b(value: number) {
        return value > 8;
      }
    }

    const objects = [
      { a: 1, b: 8 },
      { a: 2, b: 4 },
      { a: 3, b: 16 },
    ];

    const par = conforms(new Foo());
    const actual = objects.filter(par);

    expect(actual).toEqual([objects[1], objects[2]]);
  });

  it(`\`conforms\` should not invoke \`source\` predicates for missing \`object\` properties`, () => {
    let count = 0;

    const par = conforms({
      a: function () {
        count++;
        return true;
      },
    });

    // @ts-expect-error - invalid argument
    expect(par({})).toBe(false);
    expect(count).toBe(0);
  });

  it(`\`conforms\` should work with a function for \`object\``, () => {
    function Foo() {}
    Foo.a = 1;

    function Bar() {}
    Bar.a = 2;

    const par = conforms({
      a: (value: number) => value > 1,
    });

    expect(par(Foo)).toBe(false);
    expect(par(Bar)).toBe(true);
  });

  it(`\`conforms\` should work with a function for \`source\``, () => {
    function Foo() {}
    Foo.a = (value: number) => value > 1;

    const objects = [{ a: 1 }, { a: 2 }];

    const actual = objects.filter(conforms(Foo));

    expect(actual).toEqual([objects[1]]);
  });

  it(`\`conforms\` should work with a non-plain \`object\``, () => {
    class Foo {
      a: number;
      constructor() {
        this.a = 1;
      }
    }
    // @ts-expect-error - incorrect property
    Foo.prototype.b = 2;

    const par = conforms({
      b: (value: number) => value > 1,
    });

    // @ts-expect-error - unusual argument
    expect(par(new Foo())).toBe(true);
  });

  it(`\`conforms\` should return \`false\` when \`object\` is nullish`, () => {
    // eslint-disable-next-line
    const values = [, null, undefined];
    const expected = values.map(() => false);

    const par = conforms({
      a: (value: number) => value > 1,
    });

    const actual = values.map((value, index) => {
      // @ts-expect-error - invalid argument
      return index ? par(value) : par();
    });

    expect(actual).toEqual(expected);
  });

  it(`\`conforms\` should return \`true\` when comparing an empty \`source\` to a nullish \`object\``, () => {
    // eslint-disable-next-line
    const values = [, null, undefined];
    const expected = values.map(() => true);
    const par = conforms({});

    const actual = values.map((value, index) => {
      // @ts-expect-error - invalid argument
      return index ? par(value) : par();
    });

    expect(actual).toEqual(expected);
  });

  it(`\`conforms\` should return \`true\` when comparing an empty \`source\``, () => {
    const empties = [[], {}, null, undefined, false, 0, NaN, ''];
    const object = { a: 1 };
    const expected = empties.map(() => true);

    const actual = empties.map(value => {
      // @ts-expect-error - invalid argument
      const par = conforms(value);
      return par(object);
    });

    expect(actual).toEqual(expected);
  });

  it('should not change behavior if `source` is modified', () => {
    const object = { a: 2 };
    const source = {
      a: (value: number) => value > 1,
    };
    const par = conforms(source);

    expect(par(object)).toBe(true);

    source.a = (value: number) => value < 2;
    expect(par(object)).toBe(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(conforms<unknown>).toEqualTypeOf<typeof conformsLodash<unknown>>();
  });
});
