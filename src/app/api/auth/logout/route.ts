import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';

export async function DELETE(_req: NextRequest) {
  const response = NextResponse.json({ success: true });

  const secure = process.env.NODE_ENV === 'production';

  const cookiesToClear = [
    { name: 'access_token', httpOnly: true },
    { name: 'refresh_token', httpOnly: true },
    { name: 'token_expires_at', httpOnly: false },
    { name: 'is_authenticated', httpOnly: true },
    { name: 'user_first_name', httpOnly: false },
    { name: 'user_last_name', httpOnly: false },
    { name: 'user_email', httpOnly: false },
    { name: 'customer_id', httpOnly: true },
    { name: 'anonymous_id', httpOnly: true }
  ];

  cookiesToClear.forEach(({ name, httpOnly }) => {
    response.cookies.set(name, '', {
      httpOnly,
      secure,
      maxAge: 0,
      path: '/'
    });
  });

  tokenServiceInstance.clear();

  return response;
}
