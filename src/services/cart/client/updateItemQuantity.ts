import { CART_API } from '@/constants/constants';
import { Cart } from '@commercetools/platform-sdk';

export const updateItemQuantity = async (
  lineItemId: string,
  quantity: number,
  cartId?: string,
  cartVersion?: number
): Promise<Cart> => {
  const res = await fetch(CART_API.UpdateItem, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItemId, quantity, cartId, cartVersion })
  });
  if (!res.ok) throw new Error('Failed to update item quantity');

  const data = await res.json();

  return data;
};
