import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;

  try {
    const { lineItemId, quantity, cartId, cartVersion } = await req.json();

    if (!lineItemId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }

    const isCartUpdatePossible =
      typeof cartId === 'string' && cartId.trim() !== '' && typeof cartVersion === 'number';

    if (!isCartUpdatePossible) {
      return NextResponse.json({ error: 'Invalid cartId or cartVersion' }, { status: 400 });
    }

    const client =
      isAuthenticated && accessToken ? createTokenClient(accessToken) : createAnonymousClient();

    const updatedCart = await client
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity
            }
          ]
        }
      })
      .execute();

    return NextResponse.json(updatedCart.body);
  } catch (error) {
    console.error('Failed to update item quantity:', error);

    return NextResponse.json({ error: 'Failed to update item quantity' }, { status: 500 });
  }
}
