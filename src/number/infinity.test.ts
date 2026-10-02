import { describe, it, expect, expectTypeOf } from 'vitest';

import { NumberAssertionError } from '#project/error';
import { type Infinity, type Integer } from '#project/type';

import { assertInfinity, isInfinity, infinity } from './infinity.js';

const INFINITE_VALUES = [Infinity, -Infinity];

const FINITE_VALUES = [
  0,
  -0,
  1,
  -1,
  Number.MIN_VALUE,
  Number.MAX_VALUE,
  -Number.MAX_VALUE,
  NaN,
];

describe('Infinity', () => {
  it("must not accept a plain 'number'", () => {
    expectTypeOf<number>().not.toExtend<Infinity>();
  });

  it('must not be interchangeable with an unrelated brand', () => {
    expectTypeOf<Infinity>().not.toExtend<Integer>();
    expectTypeOf<Integer>().not.toExtend<Infinity>();
  });
});

describe('isInfinity', () => {
  it.each(INFINITE_VALUES)("must return 'true' for '%s'", value => {
    expect(isInfinity(value)).toBe(true);
  });

  it.each(FINITE_VALUES)("must return 'false' for '%s'", value => {
    expect(isInfinity(value)).toBe(false);
  });
});

describe('assertInfinity', () => {
  it.each(INFINITE_VALUES)("must not throw for '%s'", value => {
    expect(() => assertInfinity(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a finite value", () => {
    it.each(FINITE_VALUES)('with the default message', value => {
      expect(() => assertInfinity(value)).toThrow(
        new NumberAssertionError(
          `Expected an infinite number, received '${String(value)}'`
        )
      );
    });

    it.each(FINITE_VALUES)('with a custom message', value => {
      expect(() => assertInfinity(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(FINITE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertInfinity(
            value,
            v => `Value must be an infinite number, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be an infinite number, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('infinity', () => {
  it.each(INFINITE_VALUES)(
    "must return an infinite value when it is '%s'",
    value => {
      expect(infinity(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a finite value", () => {
    it.each(FINITE_VALUES)('with the default message', value => {
      expect(() => infinity(value)).toThrow(
        new NumberAssertionError(
          `Expected an infinite number, received '${String(value)}'`
        )
      );
    });

    it.each(FINITE_VALUES)('with a custom message', value => {
      expect(() => infinity(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(FINITE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          infinity(
            value,
            v => `Value must be an infinite number, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be an infinite number, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
