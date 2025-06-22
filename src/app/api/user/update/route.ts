import { NextRequest, NextResponse } from 'next/server';
import { createTokenClient } from '@/services/commercetools/client/createTokenClient';

import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import checkEmailAvailability from '@/services/register/checkEmail';
import handleErrors from '@/services/register/handleErrors';

import { COOKIES, ERROR_CODE, ERROR_MESSAGES } from '@/constants/constants';

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.cookies.get(COOKIES.AccessToken)?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ERROR_CODE.NotAuthenticated] },
        { status: 401 }
      );
    }

    const {
      version,
      firstName,
      lastName,
      dateOfBirth,
      email,
      phoneNumber,
      actions: addressActions
    } = await req.json();

    if (typeof version !== 'number') {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ERROR_CODE.MissingVersion] },
        { status: 400 }
      );
    }

    if (email !== undefined) {
      const isAvailable = await checkEmailAvailability(email);
      if (!isAvailable) {
        return NextResponse.json({ error: ERROR_MESSAGES[ERROR_CODE.EmailTaken] }, { status: 400 });
      }
    }

    const actions: MyCustomerUpdateAction[] = [];

    if (firstName !== undefined) actions.push({ action: 'setFirstName', firstName });
    if (lastName !== undefined) actions.push({ action: 'setLastName', lastName });
    if (dateOfBirth !== undefined) actions.push({ action: 'setDateOfBirth', dateOfBirth });
    if (email !== undefined) actions.push({ action: 'changeEmail', email });
    if (phoneNumber !== undefined)
      actions.push({
        action: 'setCustomField',
        name: 'phoneNumber',
        value: phoneNumber
      });

    if (Array.isArray(addressActions)) {
      for (const action of addressActions) {
        if (action && typeof action.action === 'string') {
          actions.push(action);
        }
      }
    }

    if (actions.length === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES[ERROR_CODE.MissingOrInvalidRequiredFields] },
        { status: 400 }
      );
    }

    const client = createTokenClient(accessToken);

    const response = await client
      .me()
      .post({
        body: {
          version,
          actions
        }
      })
      .execute();

    return NextResponse.json({ user: response.body });
  } catch (error: unknown) {
    const handled = handleErrors(error);
    console.error('Profile update error:', error);

    return NextResponse.json({ error: handled.message }, { status: 500 });
  }
}
