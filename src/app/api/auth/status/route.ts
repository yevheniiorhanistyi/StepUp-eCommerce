import { NextRequest, NextResponse } from 'next/server';

import { COOKIES } from '@/constants/constants';

export async function GET(req: NextRequest) {
  const isAuthenticated = req.cookies.get(COOKIES.IsAuthenticated)?.value === 'true';

  return NextResponse.json({ isAuthenticated });
}
