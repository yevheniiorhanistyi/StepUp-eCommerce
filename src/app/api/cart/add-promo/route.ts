import { NextRequest, NextResponse } from 'next/server';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import { COOKIES, ERROR_CODE, ERROR_MESSAGES } from '@/constants';

export async function POST(req: NextRequest) {
  const isAuthenticated = req.cookies.get(COOKIES.IsAuthenticated)?.value === 'true';
  const accessToken = req.cookies.get(COOKIES.AccessToken)?.value || null;

  try {
    const { code, cartId, cartVersion } = await req.json();

    if (typeof code !== 'string' || code.trim() === '') {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ERROR_CODE.DiscountCodeRequired] },
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
    console.error(ERROR_MESSAGES[ERROR_CODE.ApplyDiscountCodeFailed], error);

    return NextResponse.json(
      { error: ERROR_MESSAGES[ERROR_CODE.ApplyDiscountCodeFailed] },
      { status: 500 }
    );
  }
}
