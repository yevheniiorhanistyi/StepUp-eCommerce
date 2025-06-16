import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;

  try {
    const { code, cartId, cartVersion } = await req.json();

    if (typeof code !== 'string' || code.trim() === '') {
      return NextResponse.json({ error: 'Discount code is required' }, { status: 400 });
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
          actions: [{ action: 'addDiscountCode', code }]
        }
      })
      .execute();

    return NextResponse.json(updateRes.body);
  } catch (error) {
    console.error('Failed to apply discount code:', error);

    return NextResponse.json({ error: 'Failed to apply discount code!' }, { status: 500 });
  }
}
