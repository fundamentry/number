import { describe, it, expect } from 'vitest';

import { NumberAssertionError } from '#project/error';

import { assertNegative, isNegative, negative } from './negative.js';

const NEGATIVE_VALUES = [
  -1,
  -0.1,
  -Number.MIN_VALUE,
  -Number.MAX_VALUE,
  -Infinity,
];

const NON_NEGATIVE_VALUES = [
  0,
  -0,
  1,
  0.1,
  Number.MIN_VALUE,
  Number.MAX_VALUE,
  NaN,
  Infinity,
];

describe('isNegative', () => {
  it.each(NEGATIVE_VALUES)("must return 'true' for '%s'", value => {
    expect(isNegative(value)).toBe(true);
  });

  it.each(NON_NEGATIVE_VALUES)("must return 'false' for '%s'", value => {
    expect(isNegative(value)).toBe(false);
  });
});

describe('assertNegative', () => {
  it.each(NEGATIVE_VALUES)("must not throw for '%s'", value => {
    expect(() => assertNegative(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a non-negative value", () => {
    it.each(NON_NEGATIVE_VALUES)('with the default message', value => {
      expect(() => assertNegative(value)).toThrow(
        new NumberAssertionError(
          `Expected a negative number, received '${String(value)}'`
        )
      );
    });

    it.each(NON_NEGATIVE_VALUES)('with a custom message', value => {
      expect(() => assertNegative(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_NEGATIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertNegative(
            value,
            v => `Value must be negative, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be negative, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('negative', () => {
  it.each(NEGATIVE_VALUES)(
    "must return a negative value when it is '%s'",
    value => {
      expect(negative(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a non-negative value", () => {
    it.each(NON_NEGATIVE_VALUES)('with the default message', value => {
      expect(() => negative(value)).toThrow(
        new NumberAssertionError(
          `Expected a negative number, received '${String(value)}'`
        )
      );
    });

    it.each(NON_NEGATIVE_VALUES)('with a custom message', value => {
      expect(() => negative(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_NEGATIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          negative(value, v => `Value must be negative, but got '${String(v)}'`)
        ).toThrow(
          new NumberAssertionError(
            `Value must be negative, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
