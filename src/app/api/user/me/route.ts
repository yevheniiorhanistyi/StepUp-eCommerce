import { NextRequest, NextResponse } from 'next/server';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import handleErrors from '@/services/register/handleErrors';
import { COOKIES, ERROR_CODE, ERROR_MESSAGES } from '@/constants';

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get(COOKIES.AccessToken)?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ERROR_CODE.NotAuthenticated] },
        { status: 401 }
      );
    }

    const client = createTokenClient(accessToken);

    const response = await client.me().get().execute();

    return NextResponse.json(response.body);
  } catch (error: unknown) {
    const handled = handleErrors(error);

    return NextResponse.json({ error: handled.message }, { status: 500 });
  }
}
