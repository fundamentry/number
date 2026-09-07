import { describe, it, expect } from 'vitest';

import { NumberAssertionError } from '@project/error';

import { assertNonPositive, isNonPositive, nonPositive } from '.';

const NON_POSITIVE_VALUES = [
  0,
  -0,
  -1,
  -0.1,
  -Number.MIN_VALUE,
  -Number.MAX_VALUE,
  -Infinity,
];

const POSITIVE_VALUES = [
  1,
  0.1,
  Number.MIN_VALUE,
  Number.MAX_VALUE,
  NaN,
  Infinity,
];

describe('isNonPositive', () => {
  it.each(NON_POSITIVE_VALUES)("must return 'true' for '%s'", value => {
    expect(isNonPositive(value)).toBe(true);
  });

  it.each(POSITIVE_VALUES)("must return 'false' for '%s'", value => {
    expect(isNonPositive(value)).toBe(false);
  });
});

describe('assertNonPositive', () => {
  it.each(NON_POSITIVE_VALUES)("must not throw for '%s'", value => {
    expect(() => assertNonPositive(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a positive value", () => {
    it.each(POSITIVE_VALUES)('with the default message', value => {
      expect(() => assertNonPositive(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-positive number, received '${String(value)}'`
        )
      );
    });

    it.each(POSITIVE_VALUES)('with a custom message', value => {
      expect(() => assertNonPositive(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(POSITIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertNonPositive(
            value,
            v => `Value must be non-positive, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be non-positive, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('nonPositive', () => {
  it.each(NON_POSITIVE_VALUES)(
    "must return a non-positive value when it is '%s'",
    value => {
      expect(nonPositive(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a positive value", () => {
    it.each(POSITIVE_VALUES)('with the default message', value => {
      expect(() => nonPositive(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-positive number, received '${String(value)}'`
        )
      );
    });

    it.each(POSITIVE_VALUES)('with a custom message', value => {
      expect(() => nonPositive(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(POSITIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          nonPositive(
            value,
            v => `Value must be non-positive, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be non-positive, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
