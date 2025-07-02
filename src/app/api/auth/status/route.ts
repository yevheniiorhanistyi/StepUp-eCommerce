import { NextRequest, NextResponse } from 'next/server';

import { COOKIES } from '@/constants';

export async function GET(req: NextRequest) {
  const TOKEN_EXPIRY_BUFFER_MS = 2 * 60 * 60 * 1000;
  const accessToken = req.cookies.get(COOKIES.AccessToken)?.value || null;
  const refreshToken = req.cookies.get(COOKIES.RefreshToken)?.value || null;
  const isAuthenticated = req.cookies.get(COOKIES.IsAuthenticated)?.value === 'true';
  const tokenExpiresAtRaw = req.cookies.get(COOKIES.TokenExpiresAt)?.value || null;

  const tokenExpiresAt = tokenExpiresAtRaw ? Number(tokenExpiresAtRaw) : null;
  const currentTime = Date.now();

  const timeLeftMs = tokenExpiresAt ? tokenExpiresAt - currentTime : null;

  const hasValidAccessToken =
    Boolean(accessToken) && tokenExpiresAt !== null && timeLeftMs !== null && timeLeftMs > 0;

  const shouldRefresh =
    !hasValidAccessToken || (timeLeftMs !== null && timeLeftMs <= TOKEN_EXPIRY_BUFFER_MS);

  return NextResponse.json({
    isAuthenticated,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    shouldRefresh
  });
}
