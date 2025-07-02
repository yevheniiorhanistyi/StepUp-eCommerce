import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';
import { COOKIES, ROUTES } from '@/constants';

export async function DELETE(_req: NextRequest) {
  const response = NextResponse.json({ success: true });

  const secure = process.env.NODE_ENV === 'production';

  const cookiesToClear = [
    { name: COOKIES.AccessToken, httpOnly: true },
    { name: COOKIES.RefreshToken, httpOnly: true },
    { name: COOKIES.TokenExpiresAt, httpOnly: false },
    { name: COOKIES.IsAuthenticated, httpOnly: true },
    { name: COOKIES.UserFirstName, httpOnly: false },
    { name: COOKIES.UserLastName, httpOnly: false },
    { name: COOKIES.UserEmail, httpOnly: false },
    { name: COOKIES.CustomerId, httpOnly: true },
    { name: COOKIES.AnonymousId, httpOnly: true }
  ];

  cookiesToClear.forEach(({ name, httpOnly }) => {
    response.cookies.set(name, '', {
      httpOnly,
      secure,
      maxAge: 0,
      path: ROUTES.Home
    });
  });

  tokenServiceInstance.clear();

  return response;
}
