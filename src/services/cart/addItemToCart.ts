import { Cart, LineItemDraft } from '@commercetools/platform-sdk';

export const addItemToCart = async (item: LineItemDraft): Promise<Cart> => {
  const res = await fetch('/api/cart/add-item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to add item to cart');

  const data = await res.json();

  return data;
};
