import { NextResponse } from 'next/server';

import { setCookie } from '@/lib/cookies/setCookie';

import { COOKIES, ERROR_CODE, ERROR_MESSAGES, COOKIE_MAX_AGE } from '@/constants/constants';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    const cookiesToSet = [
      {
        name: COOKIES.IsAuthenticated,
        value: 'true',
        httpOnly: false,
        maxAge: COOKIE_MAX_AGE.ThirtyDays
      }
    ];

    cookiesToSet.forEach(({ name, value, httpOnly, maxAge }) => {
      setCookie(response, name, value, { httpOnly, maxAge });
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ERROR_CODE.InvalidCredentials,
          message: ERROR_MESSAGES[ERROR_CODE.InvalidCredentials]
        }
      },
      { status: 401 }
    );
  }
}
