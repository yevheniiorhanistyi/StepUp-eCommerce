import { NextRequest, NextResponse } from 'next/server';

import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value || null;
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const customerId = req.cookies.get('customer_id')?.value || null;
  const anonymousId = req.cookies.get('anonymous_id')?.value || null;

  try {
    if (isAuthenticated && accessToken && customerId) {
      const client = createTokenClient(accessToken);

      const cartResponse = await client
        .carts()
        .get({
          queryArgs: {
            where: `customerId="${customerId}"`
          }
        })
        .execute();

      const cart = cartResponse.body.results[0] || null;

      return NextResponse.json(cart);
    } else if (anonymousId) {
      const client = createAnonymousClient();

      const cartResponse = await client
        .carts()
        .get({
          queryArgs: {
            where: `anonymousId="${anonymousId}"`
          }
        })
        .execute();

      const cart = cartResponse.body.results[0] || null;

      return NextResponse.json(cart);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.error('Failed to fetch cart', error);

    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}
