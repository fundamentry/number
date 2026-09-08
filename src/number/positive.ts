import {
  type Positive,
  type NumberAssertionErrorMessage,
} from '#project/types';
import { handleNumberAssertionError } from '#project/util';

export const isPositive = (value: number): value is Positive => value > 0;

export function assertPositive(
  value: number,
  error: NumberAssertionErrorMessage = `Expected a positive number, received '${String(value)}'`
): asserts value is Positive {
  if (!isPositive(value)) handleNumberAssertionError(value, error);
}

export const positive = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertPositive(value, error);

  return value;
};
