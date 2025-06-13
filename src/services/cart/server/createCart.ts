import { ICreateCartParams } from '@/types/types';

export const createCart = async ({
  client,
  lineItem,
  customerId,
  anonymousId
}: ICreateCartParams) => {
  const { productId, variantId, quantity } = lineItem;

  const body = {
    currency: 'USD',
    ...(customerId && { customerId }),
    ...(anonymousId && { anonymousId }),
    lineItems: [
      {
        productId,
        variantId,
        quantity
      }
    ]
  };

  const response = await client.carts().post({ body }).execute();

  return response.body;
};
