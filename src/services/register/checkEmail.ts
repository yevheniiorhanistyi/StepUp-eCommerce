import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import handleErrors from './handleErrors';

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

export default checkEmailAvailability;
