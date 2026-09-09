import {
  type NonPositive,
  type NumberAssertionErrorMessage,
} from '#project/type';
import { handleNumberAssertionError } from '#project/util';

export const isNonPositive = (value: number): value is NonPositive =>
  value <= 0;

export function assertNonPositive(
  value: number,
  error: NumberAssertionErrorMessage = `Expected a non-positive number, received '${String(value)}'`
): asserts value is NonPositive {
  if (!isNonPositive(value)) handleNumberAssertionError(value, error);
}

export const nonPositive = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertNonPositive(value, error);

  return value;
};
