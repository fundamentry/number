import { describe, it, expect, expectTypeOf } from 'vitest';

import { NumberAssertionError } from '#project/error';
import {
  type Integer,
  type NonNegative,
  type NonNegativeInteger,
} from '#project/type';

import {
  assertNonNegativeInteger,
  isNonNegativeInteger,
  nonNegativeInteger,
} from './non-negative-integer.js';

const NON_NEGATIVE_INTEGER_VALUES = [0, -0, 1, 2, Number.MAX_SAFE_INTEGER];

const OTHER_VALUES = [0.1, 1.5, -1, NaN, Infinity, -Infinity];

describe('NonNegativeInteger', () => {
  it("must be assignable to 'NonNegative' and 'Integer'", () => {
    expectTypeOf<NonNegativeInteger>().toExtend<NonNegative>();
    expectTypeOf<NonNegativeInteger>().toExtend<Integer>();
  });

  it("must not accept a 'NonNegative' or an 'Integer'", () => {
    expectTypeOf<NonNegative>().not.toExtend<NonNegativeInteger>();
    expectTypeOf<Integer>().not.toExtend<NonNegativeInteger>();
  });

  it("must not accept a plain 'number'", () => {
    expectTypeOf<number>().not.toExtend<NonNegativeInteger>();
    expectTypeOf<number>().not.toExtend<NonNegative>();
  });
});

describe('isNonNegativeInteger', () => {
  it.each(NON_NEGATIVE_INTEGER_VALUES)("must return 'true' for '%s'", value => {
    expect(isNonNegativeInteger(value)).toBe(true);
  });

  it.each(OTHER_VALUES)("must return 'false' for '%s'", value => {
    expect(isNonNegativeInteger(value)).toBe(false);
  });
});

describe('assertNonNegativeInteger', () => {
  it.each(NON_NEGATIVE_INTEGER_VALUES)("must not throw for '%s'", value => {
    expect(() => assertNonNegativeInteger(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a value that is not a non-negative integer", () => {
    it.each(OTHER_VALUES)('with the default message', value => {
      expect(() => assertNonNegativeInteger(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-negative integer, received '${String(value)}'`
        )
      );
    });

    it.each(OTHER_VALUES)('with a custom message', value => {
      expect(() => assertNonNegativeInteger(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(OTHER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertNonNegativeInteger(
            value,
            v => `Value must be a non-negative integer, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be a non-negative integer, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('nonNegativeInteger', () => {
  it.each(NON_NEGATIVE_INTEGER_VALUES)(
    "must return a non-negative integer when it is '%s'",
    value => {
      expect(nonNegativeInteger(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a value that is not a non-negative integer", () => {
    it.each(OTHER_VALUES)('with the default message', value => {
      expect(() => nonNegativeInteger(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-negative integer, received '${String(value)}'`
        )
      );
    });

    it.each(OTHER_VALUES)('with a custom message', value => {
      expect(() => nonNegativeInteger(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(OTHER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          nonNegativeInteger(
            value,
            v => `Value must be a non-negative integer, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be a non-negative integer, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
