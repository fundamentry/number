import { describe, it, expect, expectTypeOf } from 'vitest';

import { NumberAssertionError } from '#project/error';
import {
  type Infinity,
  type Positive,
  type PositiveInfinity,
} from '#project/type';

import {
  assertPositiveInfinity,
  isPositiveInfinity,
  positiveInfinity,
} from './positive-infinity.js';

const POSITIVE_INFINITY_VALUES = [Infinity];

const OTHER_VALUES = [-Infinity, Number.MAX_VALUE, 0, -0, NaN];

describe('PositiveInfinity', () => {
  it("must be assignable to 'Positive' and 'Infinity'", () => {
    expectTypeOf<PositiveInfinity>().toExtend<Positive>();
    expectTypeOf<PositiveInfinity>().toExtend<Infinity>();
  });

  it("must not accept a 'Positive' or an 'Infinity'", () => {
    expectTypeOf<Positive>().not.toExtend<PositiveInfinity>();
    expectTypeOf<Infinity>().not.toExtend<PositiveInfinity>();
  });

  it("must not accept a plain 'number'", () => {
    expectTypeOf<number>().not.toExtend<PositiveInfinity>();
    expectTypeOf<number>().not.toExtend<Positive>();
  });
});

describe('isPositiveInfinity', () => {
  it.each(POSITIVE_INFINITY_VALUES)("must return 'true' for '%s'", value => {
    expect(isPositiveInfinity(value)).toBe(true);
  });

  it.each(OTHER_VALUES)("must return 'false' for '%s'", value => {
    expect(isPositiveInfinity(value)).toBe(false);
  });
});

describe('assertPositiveInfinity', () => {
  it.each(POSITIVE_INFINITY_VALUES)("must not throw for '%s'", value => {
    expect(() => assertPositiveInfinity(value)).not.toThrow();
  });

  describe("must throw a 'NumberAssertionError' for a value that is not positive infinity", () => {
    it.each(OTHER_VALUES)('with the default message', value => {
      expect(() => assertPositiveInfinity(value)).toThrow(
        new NumberAssertionError(
          `Expected positive infinity, received '${String(value)}'`
        )
      );
    });

    it.each(OTHER_VALUES)('with a custom message', value => {
      expect(() => assertPositiveInfinity(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(OTHER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          assertPositiveInfinity(
            value,
            v => `Value must be positive infinity, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be positive infinity, but got '${String(value)}'`
          )
        );
      }
    );
  });
});

describe('positiveInfinity', () => {
  it.each(POSITIVE_INFINITY_VALUES)(
    "must return positive infinity when it is '%s'",
    value => {
      expect(positiveInfinity(value)).toBe(value);
    }
  );

  describe("must throw a 'NumberAssertionError' for a value that is not positive infinity", () => {
    it.each(OTHER_VALUES)('with the default message', value => {
      expect(() => positiveInfinity(value)).toThrow(
        new NumberAssertionError(
          `Expected positive infinity, received '${String(value)}'`
        )
      );
    });

    it.each(OTHER_VALUES)('with a custom message', value => {
      expect(() => positiveInfinity(value, 'Oops!')).toThrow(
        new NumberAssertionError('Oops!')
      );
    });

    it.each(OTHER_VALUES)(
      'with a message produced by a custom factory',
      value => {
        expect(() =>
          positiveInfinity(
            value,
            v => `Value must be positive infinity, but got '${String(v)}'`
          )
        ).toThrow(
          new NumberAssertionError(
            `Value must be positive infinity, but got '${String(value)}'`
          )
        );
      }
    );
  });
});
