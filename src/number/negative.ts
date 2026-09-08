import {
  type Negative,
  type NumberAssertionErrorMessage,
} from '#project/types';
import { handleNumberAssertionError } from '#project/util';

export const isNegative = (value: number): value is Negative => value < 0;

export function assertNegative(
  value: number,
  error: NumberAssertionErrorMessage = `Expected a negative number, received '${String(value)}'`
): asserts value is Negative {
  if (!isNegative(value)) handleNumberAssertionError(value, error);
}

export const negative = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertNegative(value, error);

  return value;
};
