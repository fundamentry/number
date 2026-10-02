import { type Infinity, type NumberAssertionErrorMessage } from '#project/type';
import { handleNumberAssertionError } from '#project/util';

export const isInfinity = (value: number): value is Infinity =>
  Math.abs(value) === Infinity;

export function assertInfinity(
  value: number,
  error: NumberAssertionErrorMessage = `Expected an infinite number, received '${String(value)}'`
): asserts value is Infinity {
  if (!isInfinity(value)) handleNumberAssertionError(value, error);
}

export const infinity = (
  value: number,
  error?: NumberAssertionErrorMessage
) => {
  assertInfinity(value, error);

  return value;
};
