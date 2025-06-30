import { CART_API } from '@/constants/constants';
import { Cart } from '@commercetools/platform-sdk';

export const fetchCart = async (): Promise<Cart | null> => {
  const res = await fetch(CART_API.GetCart);
  if (!res.ok) throw new Error('Failed to fetch cart');

  const data = await res.json();

  return data;
};
