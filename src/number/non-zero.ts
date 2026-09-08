import { type NonZero, type NumberAssertionErrorMessage } from '#project/types';
import { handleNumberAssertionError } from '#project/util';

export const isNonZero = (value: number): value is NonZero => value !== 0;

export function assertNonZero(
  value: number,
  error: NumberAssertionErrorMessage = `Expected a non-zero number, received '${String(value)}'`
): asserts value is NonZero {
  if (!isNonZero(value)) handleNumberAssertionError(value, error);
}

export const nonZero = (value: number, error?: NumberAssertionErrorMessage) => {
  assertNonZero(value, error);

  return value;
};
