import { describe, it, expect, expectTypeOf } from 'vitest';

import { NumberAssertionError } from '#project/error';
import {
  type Infinity,
  type Negative,
  type NegativeInfinity,
} from '#project/type';

import {
  assertNegativeInfinity,
  isNegativeInfinity,
  negativeInfinity,
} from './negative-infinity.js';

const NEGATIVE_INFINITY_VALUES = [-Infinity];

const OTHER_VALUES = [Infinity, -Number.MAX_VALUE, 0, -0, NaN];

describe('NegativeInfinity', () => {
  it("must be assignable to 'Negative' and 'Infinity'", () => {
    expectTypeOf<NegativeInfinity>().toExtend<Negative>();
    expectTypeOf<NegativeInfinity>().toExtend<Infinity>();
  });

  it("must not accept a 'Negative' or an 'Infinity'", () => {
    expectTypeOf<Negative>().not.toExtend<NegativeInfinity>();
    expectTypeOf<Infinity>().not.toExtend<NegativeInfinity>();
  });

  it("must not accept a plain 'number'", () => {
    expectTypeOf<number>().not.toExtend<NegativeInfinity>();
    expectTypeOf<number>().not.toExtend<Negative>();
  });
});

describe('isNegativeInfinity', () => {
  it.each(NEGATIVE_INFINITY_VALUES)("must return 'true' for '%s'", value => {
    expect(isNegativeInfinity(value)).toBe(true);
  });

  it.each(OTHER_VALUES)("must return 'false' for '%s'", value => {
    expect(isNegativeInfinity(value)).toBe(false);
  });
});

describe('assertNegativeInfinity', () => {
  it.each(NEGATIVE_INFINITY_VALUES)("must not throw for '%s'", value => {
    expect(() => assertNegativeInfinity(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a value that is not negative infinity", () => {
    it.each(OTHER_VALUES)('with the default message', value => {
      expect(() => assertNegativeInfinity(value)).toThrow(
        new NumberAssertionError(
          `Expected negative infinity, received '${String(value)}'`
        )
      );
    });

    it.each(OTHER_VALUES)('with a custom message', value => {
      expect(() => assertNegativeInfinity(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(OTHER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertNegativeInfinity(
            value,
            v => `Value must be negative infinity, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be negative infinity, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('negativeInfinity', () => {
  it.each(NEGATIVE_INFINITY_VALUES)(
    "must return negative infinity when it is '%s'",
    value => {
      expect(negativeInfinity(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a value that is not negative infinity", () => {
    it.each(OTHER_VALUES)('with the default message', value => {
      expect(() => negativeInfinity(value)).toThrow(
        new NumberAssertionError(
          `Expected negative infinity, received '${String(value)}'`
        )
      );
    });

    it.each(OTHER_VALUES)('with a custom message', value => {
      expect(() => negativeInfinity(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(OTHER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          negativeInfinity(
            value,
            v => `Value must be negative infinity, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be negative infinity, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
