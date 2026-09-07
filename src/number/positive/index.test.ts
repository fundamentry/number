import { describe, it, expect } from 'vitest';

import { NumberAssertionError } from '@project/error';

import { assertPositive, isPositive, positive } from '.';

const POSITIVE_VALUES = [1, 0.1, Number.MIN_VALUE, Number.MAX_VALUE, Infinity];

const NON_POSITIVE_VALUES = [
  0,
  -0,
  -1,
  -0.1,
  -Number.MIN_VALUE,
  -Number.MAX_VALUE,
  NaN,
  -Infinity,
];

describe('isPositive', () => {
  it.each(POSITIVE_VALUES)("must return 'true' for '%s'", value => {
    expect(isPositive(value)).toBe(true);
  });

  it.each(NON_POSITIVE_VALUES)("must return 'false' for '%s'", value => {
    expect(isPositive(value)).toBe(false);
  });
});

describe('assertPositive', () => {
  it.each(POSITIVE_VALUES)("must not throw for '%s'", value => {
    expect(() => assertPositive(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a non-positive value", () => {
    it.each(NON_POSITIVE_VALUES)('with the default message', value => {
      expect(() => assertPositive(value)).toThrow(
        new NumberAssertionError(
          `Expected a positive number, received '${String(value)}'`
        )
      );
    });

    it.each(NON_POSITIVE_VALUES)('with a custom message', value => {
      expect(() => assertPositive(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_POSITIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertPositive(
            value,
            v => `Value must be positive, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be positive, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('positive', () => {
  it.each(POSITIVE_VALUES)(
    "must return a positive value when it is '%s'",
    value => {
      expect(positive(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a non-positive value", () => {
    it.each(NON_POSITIVE_VALUES)('with the default message', value => {
      expect(() => positive(value)).toThrow(
        new NumberAssertionError(
          `Expected a positive number, received '${String(value)}'`
        )
      );
    });

    it.each(NON_POSITIVE_VALUES)('with a custom message', value => {
      expect(() => positive(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_POSITIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          positive(value, v => `Value must be positive, but got '${String(v)}'`)
        ).toThrow(
          new NumberAssertionError(
            `Value must be positive, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
