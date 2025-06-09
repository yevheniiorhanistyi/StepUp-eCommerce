import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;
  const anonymousId = req.cookies.get('anonymous_id')?.value || null;

  let customerId = req.cookies.get('customer_id')?.value || null;

  try {
    const { lineItemId, quantity } = await req.json();

    if (!lineItemId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json({ error: 'Missing required fields!' }, { status: 400 });
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

      const existingCart = result.body.results[0];

      if (!existingCart) {
        return NextResponse.json({ error: 'Cart not found!' }, { status: 404 });
      }

      const updateRes = await client
        .carts()
        .withId({ ID: existingCart.id })
        .post({
          body: {
            version: existingCart.version,
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

      return NextResponse.json(updateRes.body);
    } else {
      if (!anonymousId) {
        return NextResponse.json({ error: 'Anonymous ID missing!' }, { status: 400 });
      }

      const client = createAnonymousClient();

      const result = await client
        .carts()
        .get({ queryArgs: { where: `anonymousId="${anonymousId}"` } })
        .execute();

      const existingCart = result.body.results[0];

      if (!existingCart) {
        return NextResponse.json({ error: 'Anonymous cart not found!' }, { status: 404 });
      }

      const updateRes = await client
        .carts()
        .withId({ ID: existingCart.id })
        .post({
          body: {
            version: existingCart.version,
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

      return NextResponse.json(updateRes.body);
    }
  } catch (error) {
    console.error('Failed to update item quantity:', error);

    return NextResponse.json({ error: 'Failed to update item quantity' }, { status: 500 });
  }
}
