import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Routes } from './constants/routes';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('is_authenticated')?.value === 'true';
  const { pathname } = request.nextUrl;

  if (isAuthenticated && (pathname === Routes.Login || pathname === Routes.Register)) {
    return NextResponse.redirect(new URL(Routes.Home, request.url));
  }

  if (!isAuthenticated && pathname === Routes.Profile) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [Routes.Login, Routes.Register, Routes.Profile]
};
