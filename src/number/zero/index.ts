import { type Zero, type NumberAssertionErrorMessage } from '@project/types';
import { handleNumberAssertionError } from '@project/util';

export const isZero = (value: number): value is Zero => value === 0;

export function assertZero(
  value: number,
  error: NumberAssertionErrorMessage = `Expected zero, received '${String(value)}'`
): asserts value is Zero {
  if (!isZero(value)) handleNumberAssertionError(value, error);
}

export const zero = (value: number, error?: NumberAssertionErrorMessage) => {
  assertZero(value, error);

  return value;
};
