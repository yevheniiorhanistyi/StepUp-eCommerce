import { IAddLineItemParams } from '@/types/types';

export const addLineItem = async ({
  client,
  cartId,
  cartVersion,
  lineItem
}: IAddLineItemParams) => {
  const { productId, variantId, quantity } = lineItem;

  const response = await client
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId,
            quantity
          }
        ]
      }
    })
    .execute();

  return response.body;
};
