import { NextRequest, NextResponse } from 'next/server';

import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';
import { createAuthenticatedClient } from '@/services/commercetools/client/createAuthenticatedClient';
import { mergeCarts } from '@/services/cart/server/mergeCarts';

import { setCookie } from '@/lib/cookies/setCookie';

import { ICustomerSignin } from '@/types/types';

import { COOKIES, ERROR_CODE, ERROR_MESSAGES, COOKIE_MAX_AGE } from '@/constants/constants';

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
            code: ERROR_CODE.TokenStoreInvalid,
            message: ERROR_MESSAGES[ERROR_CODE.TokenStoreInvalid]
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
      { name: COOKIES.AccessToken, value: token, httpOnly: true, maxAge },
      {
        name: COOKIES.RefreshToken,
        value: refreshToken,
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE.ThirtyDays
      },
      {
        name: COOKIES.TokenExpiresAt,
        value: String(expirationTime),
        httpOnly: false,
        maxAge
      },
      {
        name: COOKIES.IsAuthenticated,
        value: 'true',
        httpOnly: false,
        maxAge: COOKIE_MAX_AGE.ThirtyDays
      },
      { name: COOKIES.UserFirstName, value: firstName ?? '', httpOnly: false, maxAge },
      { name: COOKIES.UserLastName, value: lastName ?? '', httpOnly: false, maxAge },
      { name: COOKIES.UserEmail, value: email, httpOnly: false, maxAge }
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
          code: ERROR_CODE.InvalidCredentials,
          message: ERROR_MESSAGES[ERROR_CODE.InvalidCredentials]
        }
      },
      { status: 401 }
    );
  }
}
