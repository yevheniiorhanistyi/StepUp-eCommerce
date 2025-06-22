import { NextRequest, NextResponse } from 'next/server';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import handleErrors from '@/services/register/handleErrors';
import { ErrorCode, ERROR_MESSAGES } from '@/constants/constants';

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('access_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ErrorCode.NotAuthenticated] },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, version } = await req.json();

    if (!currentPassword || !newPassword || typeof version !== 'number') {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ErrorCode.MissingOrInvalidRequiredFields] },
        { status: 400 }
      );
    }

    const client = createTokenClient(accessToken);

    const response = await client
      .me()
      .password()
      .post({
        body: {
          currentPassword,
          newPassword,
          version
        }
      })
      .execute();

    return NextResponse.json(response.body);
  } catch (error: unknown) {
    const handled = handleErrors(error);

    if (handled.message === 'Invalid current password') {
      return NextResponse.json({ error: handled.message }, { status: 400 });
    }

    console.error('Password change error:', error);

    return NextResponse.json({ error: handled.message }, { status: 500 });
  }
}
