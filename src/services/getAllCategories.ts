import { createCredentialsClient } from '@/services/commercetools/client/createCredentialsClient';

export const getAllCategories = async () => {
  const client = createCredentialsClient();
  const response = await client.categories().get().execute();

  return response.body.results;
};
