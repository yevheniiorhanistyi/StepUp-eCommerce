import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

import { createCart } from '@/services/cart/createCart';
import { addLineItem } from '@/services/cart/addLineItem';
import { setCookie } from '@/lib/cookies/setCookie';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;

  try {
    const body = await req.json();

    const { productId, variantId, quantity = 1, cartId, cartVersion } = body;

    const isCartUpdatePossible =
      typeof cartId === 'string' && cartId.trim() !== '' && typeof cartVersion === 'number';

    if (isAuthenticated && accessToken) {
      const client = createTokenClient(accessToken);

      if (isCartUpdatePossible) {
        const updatedCart = await addLineItem({
          client,
          cartId,
          cartVersion,
          lineItem: { productId, variantId, quantity }
        });

        return NextResponse.json(updatedCart);
      } else {
        const me = await client.me().get().execute();
        const customerId = me.body.id;

        const cart = await createCart({
          client,
          lineItem: { productId, variantId, quantity },
          customerId
        });

        const response = NextResponse.json(cart);

        setCookie(response, 'customer_id', customerId);

        return response;
      }
    } else {
      const client = createAnonymousClient();

      if (isCartUpdatePossible) {
        const updatedCart = await addLineItem({
          client,
          cartId,
          cartVersion,
          lineItem: { productId, variantId, quantity }
        });

        return NextResponse.json(updatedCart);
      } else {
        const anonymousId = crypto.randomUUID();

        const anonymousCart = await createCart({
          client,
          lineItem: { productId, variantId, quantity },
          anonymousId
        });

        const response = NextResponse.json(anonymousCart);

        setCookie(response, 'anonymous_id', anonymousId);

        return response;
      }
    }
  } catch (error: unknown) {
    console.error('Failed to add product to cart:', error);

    return NextResponse.json({ error: 'Failed to add product to cart' }, { status: 500 });
  }
}
