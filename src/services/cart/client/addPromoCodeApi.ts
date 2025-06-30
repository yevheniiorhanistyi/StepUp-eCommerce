import { CART_API } from '@/constants/constants';
import { Cart } from '@commercetools/platform-sdk';

export const addPromoCodeApi = async (
  code: string,
  cartId?: string,
  cartVersion?: number
): Promise<Cart> => {
  const res = await fetch(CART_API.AddPromo, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, cartId, cartVersion })
  });
  if (!res.ok) throw new Error('Failed to add promo code!');

  const data = await res.json();

  return data;
};
