import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;

  try {
    const { lineItemId, cartId, cartVersion } = await req.json();

    if (!lineItemId) {
      return NextResponse.json({ error: 'lineItemId is required' }, { status: 400 });
    }

    const isCartUpdatePossible =
      typeof cartId === 'string' && cartId.trim() !== '' && typeof cartVersion === 'number';

    if (!isCartUpdatePossible) {
      return NextResponse.json({ error: 'Invalid cartId or cartVersion' }, { status: 400 });
    }

    const client =
      isAuthenticated && accessToken ? createTokenClient(accessToken) : createAnonymousClient();

    const updateRes = await client
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [{ action: 'removeLineItem', lineItemId }]
        }
      })
      .execute();

    return NextResponse.json(updateRes.body);
  } catch (error) {
    console.error('Failed to remove product from cart:', error);

    return NextResponse.json({ error: 'Failed to remove product from cart' }, { status: 500 });
  }
}
