import {
  type NonNegative,
  type NumberAssertionErrorMessage,
} from '@project/types';
import { handleNumberAssertionError } from '@project/util';

export const isNonNegative = (value: number): value is NonNegative =>
  value >= 0;

export function assertNonNegative(
  value: number,
  error: NumberAssertionErrorMessage = `Expected a non-negative number, received '${String(value)}'`
): asserts value is NonNegative {
  if (!isNonNegative(value)) handleNumberAssertionError(value, error);
}

export const nonNegative = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertNonNegative(value, error);

  return value;
};
