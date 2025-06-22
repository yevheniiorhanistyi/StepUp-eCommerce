import { NextRequest, NextResponse } from 'next/server';

import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';

import { COOKIES, ERROR_CODE, ERROR_MESSAGES } from '@/constants/constants';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIES.AccessToken)?.value || null;
  const isAuthenticated = req.cookies.get(COOKIES.IsAuthenticated)?.value === 'true';
  const anonymousId = req.cookies.get(COOKIES.AnonymousId)?.value || null;

  let customerId = req.cookies.get(COOKIES.CustomerId)?.value || null;

  try {
    if (isAuthenticated && accessToken) {
      const client = createTokenClient(accessToken);

      if (!customerId) {
        const me = await client.me().get().execute();
        customerId = me.body.id;
      }

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
    console.error(ERROR_MESSAGES[ERROR_CODE.FailedToFetchCart], error);

    return NextResponse.json(
      { error: ERROR_MESSAGES[ERROR_CODE.FailedToFetchCart] },
      { status: 500 }
    );
  }
}
