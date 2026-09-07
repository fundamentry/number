import { describe, it, expect } from 'vitest';

import { NumberAssertionError } from '@project/error';

import { assertNonZero, isNonZero, nonZero } from './non-zero';

const NON_ZERO_VALUES = [
  1,
  -1,
  0.1,
  Number.MIN_VALUE,
  -Number.MIN_VALUE,
  NaN,
  Infinity,
  -Infinity,
];

const ZERO_VALUES = [0, -0];

describe('isNonZero', () => {
  it.each(NON_ZERO_VALUES)("must return 'true' for '%s'", value => {
    expect(isNonZero(value)).toBe(true);
  });

  it.each(ZERO_VALUES)("must return 'false' for '%s'", value => {
    expect(isNonZero(value)).toBe(false);
  });
});

describe('assertNonZero', () => {
  it.each(NON_ZERO_VALUES)("must not throw for '%s'", value => {
    expect(() => assertNonZero(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a zero value", () => {
    it.each(ZERO_VALUES)('with the default message', value => {
      expect(() => assertNonZero(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-zero number, received '${String(value)}'`
        )
      );
    });

    it.each(ZERO_VALUES)('with a custom message', value => {
      expect(() => assertNonZero(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(ZERO_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertNonZero(
            value,
            v => `Value must be non-zero, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be non-zero, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('nonZero', () => {
  it.each(NON_ZERO_VALUES)(
    "must return a non-zero value when it is '%s'",
    value => {
      expect(nonZero(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a zero value", () => {
    it.each(ZERO_VALUES)('with the default message', value => {
      expect(() => nonZero(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-zero number, received '${String(value)}'`
        )
      );
    });

    it.each(ZERO_VALUES)('with a custom message', value => {
      expect(() => nonZero(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(ZERO_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          nonZero(value, v => `Value must be non-zero, but got '${String(v)}'`)
        ).toThrow(
          new NumberAssertionError(
            `Value must be non-zero, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
