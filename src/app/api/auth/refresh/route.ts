import { NextRequest, NextResponse } from 'next/server';

import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';
import { createRefreshTokenClient } from '@/services/commercetools/client/createRefreshTokenClient';

import { setCookie } from '@/lib/cookies/setCookie';

import { COOKIE_MAX_AGE, ERROR_MESSAGES, ErrorCode } from '@/constants/constants';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value || null;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES[ErrorCode.RefreshTokenMissing] },
        { status: 401 }
      );
    }

    tokenServiceInstance.clear();

    const client = createRefreshTokenClient(refreshToken);
    await client.me().get().execute();

    const { token, expirationTime } = tokenServiceInstance.get() || {};

    if (!token || !expirationTime) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES[ErrorCode.RefreshFailed] },
        { status: 500 }
      );
    }

    const maxAge = Math.floor((expirationTime - Date.now()) / 1000);

    const response = NextResponse.json({ success: true });

    setCookie(response, 'access_token', token, {
      httpOnly: true,
      maxAge
    });

    setCookie(response, 'token_expires_at', String(expirationTime), {
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE.ThirtyDays
    });

    return response;
  } catch (error) {
    console.error('Refresh error:', error);

    return NextResponse.json(
      { success: false, message: ERROR_MESSAGES[ErrorCode.RefreshFailed] },
      { status: 401 }
    );
  }
}
