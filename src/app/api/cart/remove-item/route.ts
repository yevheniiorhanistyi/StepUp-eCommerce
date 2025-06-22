import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import { COOKIES, ERROR_CODE, ERROR_MESSAGES } from '@/constants/constants';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get(COOKIES.IsAuthenticated)?.value === 'true';
  const accessToken = req.cookies.get(COOKIES.AccessToken)?.value || null;

  try {
    const { lineItemId, cartId, cartVersion } = await req.json();

    if (!lineItemId) {
      return NextResponse.json({ error: 'lineItemId is required' }, { status: 400 });
    }

    const isCartUpdatePossible =
      typeof cartId === 'string' && cartId.trim() !== '' && typeof cartVersion === 'number';

    if (!isCartUpdatePossible) {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ERROR_CODE.InvalidCartIdOrCartVersion] },
        { status: 400 }
      );
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
    console.error(ERROR_MESSAGES[ERROR_CODE.RemoveProductFromCartFailed], error);

    return NextResponse.json(
      { error: ERROR_MESSAGES[ERROR_CODE.RemoveProductFromCartFailed] },
      { status: 500 }
    );
  }
}
