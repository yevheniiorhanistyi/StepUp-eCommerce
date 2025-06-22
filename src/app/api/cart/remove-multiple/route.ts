import { NextRequest, NextResponse } from 'next/server';
import { CartRemoveLineItemAction } from '@commercetools/platform-sdk';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

import { ErrorCode, ERROR_MESSAGES } from '@/constants/constants';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const accessToken = req.cookies.get('access_token')?.value || null;

  try {
    const { lineItemIds, cartId, cartVersion } = await req.json();

    if (!Array.isArray(lineItemIds) || lineItemIds.length === 0) {
      return NextResponse.json({ error: 'lineItemIds must be a non-empty array' }, { status: 400 });
    }

    const isCartUpdatePossible =
      typeof cartId === 'string' && cartId.trim() !== '' && typeof cartVersion === 'number';

    if (!isCartUpdatePossible) {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ErrorCode.InvalidCartIdOrCartVersion] },
        { status: 400 }
      );
    }

    const client =
      isAuthenticated && accessToken ? createTokenClient(accessToken) : createAnonymousClient();

    const actions: CartRemoveLineItemAction[] = lineItemIds.map((lineItemId) => ({
      action: 'removeLineItem',
      lineItemId
    }));

    const updateRes = await client
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions
        }
      })
      .execute();

    return NextResponse.json(updateRes.body);
  } catch (error) {
    console.error(ERROR_MESSAGES[ErrorCode.RemoveProductFromCartFailed], error);

    return NextResponse.json(
      { error: ERROR_MESSAGES[ErrorCode.RemoveProductFromCartFailed] },
      { status: 500 }
    );
  }
}
