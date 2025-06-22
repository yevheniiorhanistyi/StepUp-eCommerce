import { NextRequest, NextResponse } from 'next/server';

import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';
import { createAuthenticatedClient } from '@/services/commercetools/client/createAuthenticatedClient';
import { mergeCarts } from '@/services/cart/server/mergeCarts';

import { setCookie } from '@/lib/cookies/setCookie';

import { ICustomerSignin } from '@/types/types';

import { ErrorCode, ERROR_MESSAGES, COOKIE_MAX_AGE } from '@/constants/constants';

export async function POST(req: NextRequest) {
  try {
    const { email, password, anonymousId } = await req.json();
    const client = createAuthenticatedClient(email, password);

    const payload: ICustomerSignin = {
      email,
      password,
      anonymousId,
      activeCartSignInMode: 'MergeWithExistingCustomerCart'
    };

    await client.me().login().post({ body: payload }).execute();

    const { token, refreshToken, expirationTime } = tokenServiceInstance.get() || {};

    if (!token || !refreshToken || !expirationTime) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCode.TokenStoreInvalid,
            message: ERROR_MESSAGES[ErrorCode.TokenStoreInvalid]
          }
        },
        { status: 500 }
      );
    }

    const userResponse = await client.me().get().execute();
    const { firstName, lastName } = userResponse.body;

    const maxAge = Math.floor((expirationTime - Date.now()) / 1000);

    const response = NextResponse.json({ success: true });

    const cookiesToSet = [
      { name: 'access_token', value: token, httpOnly: true, maxAge },
      {
        name: 'refresh_token',
        value: refreshToken,
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE.ThirtyDays
      },
      {
        name: 'token_expires_at',
        value: String(expirationTime),
        httpOnly: false,
        maxAge
      },
      {
        name: 'is_authenticated',
        value: 'true',
        httpOnly: false,
        maxAge: COOKIE_MAX_AGE.ThirtyDays
      },
      { name: 'user_first_name', value: firstName ?? '', httpOnly: false, maxAge },
      { name: 'user_last_name', value: lastName ?? '', httpOnly: false, maxAge },
      { name: 'user_email', value: email, httpOnly: false, maxAge }
    ];

    cookiesToSet.forEach(({ name, value, httpOnly, maxAge }) => {
      setCookie(response, name, value, { httpOnly, maxAge });
    });

    if (anonymousId) {
      try {
        await mergeCarts(client, anonymousId);
      } catch (mergeError) {
        console.error('Manual cart merge error:', mergeError);
      }
    }

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCode.InvalidCredentials,
          message: ERROR_MESSAGES[ErrorCode.InvalidCredentials]
        }
      },
      { status: 401 }
    );
  }
}
