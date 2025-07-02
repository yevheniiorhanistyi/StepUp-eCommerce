import { NextResponse } from 'next/server';
import { cookieOptions } from './cookieOptions';

export const setCookie = (
  res: NextResponse,
  name: string,
  value: string,
  options: Partial<Parameters<typeof res.cookies.set>[2]> = {}
) => {
  res.cookies.set(name, value, { ...cookieOptions, ...options });
};
