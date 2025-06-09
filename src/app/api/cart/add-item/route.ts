import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import { LineItemDraft } from '@commercetools/platform-sdk';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;
  const customerId = req.cookies.get('customer_id')?.value || null;
  const anonymousId = req.cookies.get('anonymous_id')?.value || null;

  try {
    const body: LineItemDraft = await req.json();

    const { productId, variantId, quantity = 1 } = body;

    if (isAuthenticated && accessToken) {
      const client = createTokenClient(accessToken);

      if (customerId) {
        const result = await client
          .carts()
          .get({ queryArgs: { where: `customerId="${customerId}" and cartState="Active"` } })
          .execute();

        const existingCart = result.body.results[0];

        if (!existingCart) {
          return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        const updateRes = await client
          .carts()
          .withId({ ID: existingCart.id })
          .post({
            body: {
              version: existingCart.version,
              actions: [
                {
                  action: 'addLineItem',
                  productId,
                  variantId,
                  quantity
                }
              ]
            }
          })
          .execute();

        return NextResponse.json(updateRes.body);
      } else {
        const me = await client.me().get().execute();
        const customerId = me.body.id;

        const createRes = await client
          .carts()
          .post({
            body: {
              currency: 'USD',
              customerId,
              lineItems: [
                {
                  productId,
                  variantId,
                  quantity
                }
              ]
            }
          })
          .execute();

        const response = NextResponse.json(createRes.body);

        response.cookies.set('customer_id', customerId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        });

        return response;
      }
    } else {
      const client = createAnonymousClient();

      if (anonymousId) {
        const result = await client
          .carts()
          .get({ queryArgs: { where: `anonymousId="${anonymousId}"` } })
          .execute();

        const existingCart = result.body.results[0];

        if (!existingCart) {
          return NextResponse.json({ error: 'Anonymous cart not found' }, { status: 404 });
        }

        const updateRes = await client
          .carts()
          .withId({ ID: existingCart.id })
          .post({
            body: {
              version: existingCart.version,
              actions: [
                {
                  action: 'addLineItem',
                  productId,
                  variantId,
                  quantity
                }
              ]
            }
          })
          .execute();

        return NextResponse.json(updateRes.body);
      } else {
        const anonymousId = crypto.randomUUID();
        const createRes = await client
          .carts()
          .post({
            body: {
              currency: 'USD',
              anonymousId,
              lineItems: [
                {
                  productId,
                  variantId,
                  quantity
                }
              ]
            }
          })
          .execute();

        const response = NextResponse.json(createRes.body);

        response.cookies.set('anonymous_id', anonymousId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        });

        return response;
      }
    }
  } catch (error: unknown) {
    console.error('Failed to add product to cart:', error);

    return NextResponse.json({ error: 'Failed to add product to cart' }, { status: 500 });
  }
}
