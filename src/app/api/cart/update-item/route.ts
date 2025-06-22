import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

import { COOKIES, ERROR_CODE, ERROR_MESSAGES } from '@/constants/constants';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get(COOKIES.IsAuthenticated)?.value === 'true';
  const accessToken = req.cookies.get(COOKIES.AccessToken)?.value || null;

  try {
    const { lineItemId, quantity, cartId, cartVersion } = await req.json();

    if (!lineItemId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ERROR_CODE.MissingOrInvalidRequiredFields] },
        { status: 400 }
      );
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
    console.error(ERROR_MESSAGES[ERROR_CODE.UpdateItemQuantityFailed], error);

    return NextResponse.json(
      { error: ERROR_MESSAGES[ERROR_CODE.UpdateItemQuantityFailed] },
      { status: 500 }
    );
  }
}
