export const removeItemsFromCart = async (
  lineItemIds: string[],
  cartId?: string,
  version?: number
) => {
  if (!cartId || version === undefined) throw new Error('Missing cart ID or version');

  const res = await fetch('/api/cart/remove-multiple', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItemIds, cartId, cartVersion: version })
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Failed to remove items from cart');
  }

  return await res.json();
};
