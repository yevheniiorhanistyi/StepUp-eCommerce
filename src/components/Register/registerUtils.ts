import { ErrorObject, ErrorResponse } from '@commercetools/platform-sdk';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';

interface CommercetoolsError {
  body: ErrorResponse;
}

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

async function checkEmailAvailability(email: string): Promise<boolean> {
  const apiRoot = createAnonymousClient();

  try {
    const response = await apiRoot
      .customers()
      .get({ queryArgs: { where: `email="${email}"` } })
      .execute();

    return response.body.total === 0;
  } catch (error) {
    const handledError = handleErrors(error);
    throw handledError;
  }
}

export { handleErrors, checkEmailAvailability };
