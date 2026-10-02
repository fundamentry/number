import {
  type NegativeInfinity,
  type NumberAssertionErrorMessage,
} from '#project/type';
import { handleNumberAssertionError } from '#project/util';

import { isInfinity } from './infinity.js';
import { isNegative } from './negative.js';

export const isNegativeInfinity = (value: number): value is NegativeInfinity =>
  isInfinity(value) && isNegative(value);

export function assertNegativeInfinity(
  value: number,
  error: NumberAssertionErrorMessage = `Expected negative infinity, received '${String(value)}'`
): asserts value is NegativeInfinity {
  if (!isNegativeInfinity(value)) handleNumberAssertionError(value, error);
}

export const negativeInfinity = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertNegativeInfinity(value, error);

  return value;
};
