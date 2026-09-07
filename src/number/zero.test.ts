import { describe, it, expect } from 'vitest';

import { NumberAssertionError } from '@project/error';

import { assertZero, isZero, zero } from './zero';

const ZERO_VALUES = [0, -0];

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

describe('isZero', () => {
  it.each(ZERO_VALUES)("must return 'true' for '%s'", value => {
    expect(isZero(value)).toBe(true);
  });

  it.each(NON_ZERO_VALUES)("must return 'false' for '%s'", value => {
    expect(isZero(value)).toBe(false);
  });
});

describe('assertZero', () => {
  it.each(ZERO_VALUES)("must not throw for '%s'", value => {
    expect(() => assertZero(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a non-zero value", () => {
    it.each(NON_ZERO_VALUES)('with the default message', value => {
      expect(() => assertZero(value)).toThrow(
        new NumberAssertionError(`Expected zero, received '${String(value)}'`)
      );
    });

    it.each(NON_ZERO_VALUES)('with a custom message', value => {
      expect(() => assertZero(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_ZERO_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertZero(value, v => `Value must be zero, but got '${String(v)}'`)
        ).toThrow(
          new NumberAssertionError(
            `Value must be zero, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('zero', () => {
  it.each(ZERO_VALUES)("must return a zero value when it is '%s'", value => {
    expect(zero(value)).toBe(value);
  });

  describe("must throw a 'NumberAssertionError' for a non-zero value", () => {
    it.each(NON_ZERO_VALUES)('with the default message', value => {
      expect(() => zero(value)).toThrow(
        new NumberAssertionError(`Expected zero, received '${String(value)}'`)
      );
    });

    it.each(NON_ZERO_VALUES)('with a custom message', value => {
      expect(() => zero(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(NON_ZERO_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          zero(value, v => `Value must be zero, but got '${String(v)}'`)
        ).toThrow(
          new NumberAssertionError(
            `Value must be zero, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
