import { ErrorObject } from '@commercetools/platform-sdk';
import { CommercetoolsError } from '@/types/types';

function handleErrors(error: unknown): Error {
  if (typeof error === 'object' && error !== null && 'body' in error) {
    const commercetoolsError = error as CommercetoolsError;
    const { statusCode, message, errors } = commercetoolsError.body;

    const duplicateEmail = errors?.find(
      (e: ErrorObject) => e.code === 'DuplicateField' && e.field === 'email'
    );
    if (duplicateEmail) {
      console.error('User with this email already exists');

      return new Error('User with this email already exists');
    }

    const invalidPassword = errors?.find((e: ErrorObject) => e.code === 'InvalidCurrentPassword');
    if (invalidPassword) {
      console.error('Invalid current password');

      return new Error('Invalid current password');
    }

    console.error(`Commercetools error ${statusCode}:`, message);

    return new Error(message || 'Commercetools error');
  }

  if (error instanceof Error) {
    return new Error(error.message || 'Unknown error');
  }

  return new Error('Something went wrong, try again.');
}

export default handleErrors;
