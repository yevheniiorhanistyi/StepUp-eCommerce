import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { COOKIES, ROUTES } from '@/constants/constants';

export async function DELETE(_req: NextRequest) {
  const response = NextResponse.json({ success: true });

  const secure = process.env.NODE_ENV === 'production';

  const cookiesToClear = [{ name: COOKIES.IsAuthenticated, httpOnly: true }];

  cookiesToClear.forEach(({ name, httpOnly }) => {
    response.cookies.set(name, '', {
      httpOnly,
      secure,
      maxAge: 0,
      path: ROUTES.Home
    });
  });

  return response;
}
