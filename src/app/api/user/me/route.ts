import { NextRequest, NextResponse } from 'next/server';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';
import handleErrors from '@/services/register/handleErrors';

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const client = createTokenClient(accessToken);

    const response = await client.me().get().execute();

    return NextResponse.json(response.body);
  } catch (error: unknown) {
    const handled = handleErrors(error);
    console.error('Failed to fetch user data:', error);

    return NextResponse.json({ error: handled.message }, { status: 500 });
  }
}
