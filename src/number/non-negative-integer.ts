import {
  type NonNegativeInteger,
  type NumberAssertionErrorMessage,
} from '#project/type';
import { handleNumberAssertionError } from '#project/util';

import { isInteger } from './integer.js';
import { isNonNegative } from './non-negative.js';

export const isNonNegativeInteger = (
  value: number
): value is NonNegativeInteger => isInteger(value) && isNonNegative(value);

export function assertNonNegativeInteger(
  value: number,
  error: NumberAssertionErrorMessage = `Expected a non-negative integer, received '${String(value)}'`
): asserts value is NonNegativeInteger {
  if (!isNonNegativeInteger(value)) handleNumberAssertionError(value, error);
}

export const nonNegativeInteger = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertNonNegativeInteger(value, error);

  return value;
};
