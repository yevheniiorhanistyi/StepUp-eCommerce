import { CART_API } from '@/constants/constants';
import { Cart } from '@commercetools/platform-sdk';

export const removeItemFromCart = async (
  lineItemId: string,
  cartId?: string,
  cartVersion?: number
): Promise<Cart> => {
  const res = await fetch(CART_API.RemoveItem, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItemId, cartId, cartVersion })
  });
  if (!res.ok) throw new Error('Failed to remove item from cart');

  const data = await res.json();

  return data;
};
