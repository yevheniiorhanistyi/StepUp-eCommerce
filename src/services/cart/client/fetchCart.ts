import { Cart } from '@commercetools/platform-sdk';

export const fetchCart = async (): Promise<Cart | null> => {
  const res = await fetch('/api/cart');
  if (!res.ok) throw new Error('Failed to fetch cart');

  const data = await res.json();

  return data;
};
