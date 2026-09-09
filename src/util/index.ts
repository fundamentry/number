import { NumberAssertionError } from '#project/error';
import { type NumberAssertionErrorMessage } from '#project/type';

export const handleNumberAssertionError = (
  value: number,
  message: NumberAssertionErrorMessage
) => {
  throw new NumberAssertionError(
    typeof message === 'function' ? message(value) : message
  );
};
