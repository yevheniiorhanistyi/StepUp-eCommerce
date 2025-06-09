import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;
  const anonymousId = req.cookies.get('anonymous_id')?.value || null;

  let customerId = req.cookies.get('customer_id')?.value || null;

  try {
    const body = await req.json();

    const { lineItemId } = body;

    if (!lineItemId) {
      return NextResponse.json({ error: 'lineItemId is required' }, { status: 400 });
    }

    if (isAuthenticated && accessToken) {
      const client = createTokenClient(accessToken);

      if (!customerId) {
        const me = await client.me().get().execute();
        customerId = me.body.id;
      }

      const result = await client
        .carts()
        .get({ queryArgs: { where: `customerId="${customerId}" and cartState="Active"` } })
        .execute();

      const cart = result.body.results[0];

      if (!cart) {
        return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
      }

      const updateRes = await client
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: lineItemId
              }
            ]
          }
        })
        .execute();

      return NextResponse.json(updateRes.body);
    } else {
      const client = createAnonymousClient();

      if (!anonymousId) {
        return NextResponse.json({ error: 'Anonymous cart not found' }, { status: 404 });
      }

      const result = await client
        .carts()
        .get({ queryArgs: { where: `anonymousId="${anonymousId}" and cartState="Active"` } })
        .execute();

      const cart = result.body.results[0];

      if (!cart) {
        return NextResponse.json({ error: 'Anonymous cart not found' }, { status: 404 });
      }

      const updateRes = await client
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: lineItemId
              }
            ]
          }
        })
        .execute();

      return NextResponse.json(updateRes.body);
    }
  } catch (error: unknown) {
    console.error('Failed to remove product from cart:', error);

    return NextResponse.json({ error: 'Failed to remove product from cart' }, { status: 500 });
  }
}
