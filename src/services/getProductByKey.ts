import { createCredentialsClient } from '@/services/commercetools/client/createCredentialsClient';

const apiRoot = createCredentialsClient();

export const getProductByKey = async (key: string) => {
  try {
    const response = await apiRoot
      .products()
      .withKey({ key })
      .get({
        queryArgs: {
          expand: [
            'masterData.current.categories[*]',
            'masterData.current.masterVariant.prices[*].discounted.discount'
          ]
        }
      })
      .execute();

    return response.body;
  } catch (error) {
    console.error(`Failed to fetch product with key: ${key}`, error);

    return null;
  }
};
