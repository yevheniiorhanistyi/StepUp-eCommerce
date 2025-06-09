import { Cart } from '@commercetools/platform-sdk';

export const removeItemFromCart = async (lineItemId: string): Promise<Cart> => {
  const res = await fetch('/api/cart/remove-item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItemId })
  });
  if (!res.ok) throw new Error('Failed to remove item from cart');

  const data = await res.json();

  return data;
};
