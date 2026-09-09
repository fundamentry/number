import { describe, it, expect } from 'vitest';

import { NumberAssertionError } from '#project/error';

import {
  assertNonNegative,
  isNonNegative,
  nonNegative,
} from './non-negative.js';

const NON_NEGATIVE_VALUES = [
  0,
  -0,
  1,
  0.1,
  Number.MIN_VALUE,
  Number.MAX_VALUE,
  Infinity,
];

const NEGATIVE_VALUES = [
  -1,
  -0.1,
  -Number.MIN_VALUE,
  -Number.MAX_VALUE,
  NaN,
  -Infinity,
];

describe('isNonNegative', () => {
  it.each(NON_NEGATIVE_VALUES)("must return 'true' for '%s'", value => {
    expect(isNonNegative(value)).toBe(true);
  });

  it.each(NEGATIVE_VALUES)("must return 'false' for '%s'", value => {
    expect(isNonNegative(value)).toBe(false);
  });
});

describe('assertNonNegative', () => {
  it.each(NON_NEGATIVE_VALUES)("must not throw for '%s'", value => {
    expect(() => assertNonNegative(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a negative value", () => {
    it.each(NEGATIVE_VALUES)('with the default message', value => {
      expect(() => assertNonNegative(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-negative number, received '${String(value)}'`
        )
      );
    });

    it.each(NEGATIVE_VALUES)('with a custom message', value => {
      expect(() => assertNonNegative(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NEGATIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertNonNegative(
            value,
            v => `Value must be non-negative, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be non-negative, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('nonNegative', () => {
  it.each(NON_NEGATIVE_VALUES)(
    "must return a non-negative value when it is '%s'",
    value => {
      expect(nonNegative(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a negative value", () => {
    it.each(NEGATIVE_VALUES)('with the default message', value => {
      expect(() => nonNegative(value)).toThrow(
        new NumberAssertionError(
          `Expected a non-negative number, received '${String(value)}'`
        )
      );
    });

    it.each(NEGATIVE_VALUES)('with a custom message', value => {
      expect(() => nonNegative(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NEGATIVE_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          nonNegative(
            value,
            v => `Value must be non-negative, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be non-negative, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
