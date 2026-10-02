import { type Integer, type NumberAssertionErrorMessage } from '#project/type';
import { handleNumberAssertionError } from '#project/util';

export const isInteger = (value: number): value is Integer =>
  Number.isInteger(value);

export function assertInteger(
  value: number,
  error: NumberAssertionErrorMessage = `Expected an integer, received '${String(value)}'`
): asserts value is Integer {
  if (!isInteger(value)) handleNumberAssertionError(value, error);
}

export const integer = (value: number, error?: NumberAssertionErrorMessage) => {
  assertInteger(value, error);

  return value;
};
