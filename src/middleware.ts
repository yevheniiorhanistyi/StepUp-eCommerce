import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './constants/constants';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('is_authenticated')?.value === 'true';
  const { pathname } = request.nextUrl;

  if (isAuthenticated && (pathname === ROUTES.Login || pathname === ROUTES.Register)) {
    return NextResponse.redirect(new URL(ROUTES.Home, request.url));
  }

  if (!isAuthenticated && pathname === ROUTES.Profile) {
    return NextResponse.redirect(new URL(ROUTES.Login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ROUTES.Login, ROUTES.Register, ROUTES.Profile]
};
