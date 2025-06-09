import { Cart } from '@commercetools/platform-sdk';

export const updateItemQuantity = async (lineItemId: string, quantity: number): Promise<Cart> => {
  const res = await fetch('/api/cart/update-item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItemId, quantity })
  });
  if (!res.ok) throw new Error('Failed to update item quantity');

  const data = await res.json();

  return data;
};
