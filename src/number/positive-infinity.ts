import {
  type NumberAssertionErrorMessage,
  type PositiveInfinity,
} from '#project/type';
import { handleNumberAssertionError } from '#project/util';

import { isInfinity } from './infinity.js';
import { isPositive } from './positive.js';

export const isPositiveInfinity = (value: number): value is PositiveInfinity =>
  isInfinity(value) && isPositive(value);

export function assertPositiveInfinity(
  value: number,
  error: NumberAssertionErrorMessage = `Expected positive infinity, received '${String(value)}'`
): asserts value is PositiveInfinity {
  if (!isPositiveInfinity(value)) handleNumberAssertionError(value, error);
}

export const positiveInfinity = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertPositiveInfinity(value, error);

  return value;
};
