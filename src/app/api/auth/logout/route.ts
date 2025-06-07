import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';

export async function DELETE(_req: NextRequest) {
  const response = NextResponse.json({ success: true });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  };

  response.cookies.set('access_token', '', cookieOptions);
  response.cookies.set('refresh_token', '', cookieOptions);
  response.cookies.set('is_authenticated', '', cookieOptions);
  response.cookies.set('token_expires_at', '', { ...cookieOptions, httpOnly: false });
  response.cookies.set('user_email', '', { ...cookieOptions, httpOnly: false });
  response.cookies.set('user_first_name', '', { ...cookieOptions, httpOnly: false });
  response.cookies.set('user_last_name', '', { ...cookieOptions, httpOnly: false });
  response.cookies.set('customer_id', '', cookieOptions);
  response.cookies.set('anonymous_id', '', cookieOptions);

  tokenServiceInstance.clear();

  return response;
}
