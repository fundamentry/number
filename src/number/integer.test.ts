import { describe, it, expect, expectTypeOf } from 'vitest';

import { NumberAssertionError } from '#project/error';
import { type Integer, type NonNegative } from '#project/type';

import { assertInteger, isInteger, integer } from './integer.js';

const INTEGER_VALUES = [
  0,
  -0,
  1,
  -1,
  Number.MAX_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER,
  Number.MAX_VALUE,
  -Number.MAX_VALUE,
];

const NON_INTEGER_VALUES = [
  0.1,
  1.5,
  -1.5,
  Number.MIN_VALUE,
  NaN,
  Infinity,
  -Infinity,
];

describe('Integer', () => {
  it("must not accept a plain 'number'", () => {
    expectTypeOf<number>().not.toExtend<Integer>();
  });

  it('must not be interchangeable with an unrelated brand', () => {
    expectTypeOf<Integer>().not.toExtend<NonNegative>();
    expectTypeOf<NonNegative>().not.toExtend<Integer>();
  });
});

describe('isInteger', () => {
  it.each(INTEGER_VALUES)("must return 'true' for '%s'", value => {
    expect(isInteger(value)).toBe(true);
  });

  it.each(NON_INTEGER_VALUES)("must return 'false' for '%s'", value => {
    expect(isInteger(value)).toBe(false);
  });
});

describe('assertInteger', () => {
  it.each(INTEGER_VALUES)("must not throw for '%s'", value => {
    expect(() => assertInteger(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a non-integer value", () => {
    it.each(NON_INTEGER_VALUES)('with the default message', value => {
      expect(() => assertInteger(value)).toThrow(
        new NumberAssertionError(
          `Expected an integer, received '${String(value)}'`
        )
      );
    });

    it.each(NON_INTEGER_VALUES)('with a custom message', value => {
      expect(() => assertInteger(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_INTEGER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertInteger(
            value,
            v => `Value must be an integer, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be an integer, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('integer', () => {
  it.each(INTEGER_VALUES)(
    "must return an integer value when it is '%s'",
    value => {
      expect(integer(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a non-integer value", () => {
    it.each(NON_INTEGER_VALUES)('with the default message', value => {
      expect(() => integer(value)).toThrow(
        new NumberAssertionError(
          `Expected an integer, received '${String(value)}'`
        )
      );
    });

    it.each(NON_INTEGER_VALUES)('with a custom message', value => {
      expect(() => integer(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_INTEGER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          integer(
            value,
            v => `Value must be an integer, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be an integer, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
