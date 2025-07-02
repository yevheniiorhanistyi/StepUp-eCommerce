import { NextResponse } from 'next/server';
import { createCredentialsClient } from '@/services/commercetools/client/createCredentialsClient';

import { ERROR_CODE, ERROR_MESSAGES } from '@/constants';

export async function GET() {
  try {
    const key = 'all-time-favorites';
    const client = createCredentialsClient();
    const response = await client.categories().get().execute();
    const categories = response.body.results;
    const category = categories.find((c) => c.key === key);

    if (!category) {
      return NextResponse.json({ error: `Category with key "${key}" not found` }, { status: 404 });
    }

    const productsResponse = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [`categories.id:"${category.id}"`],
          limit: 10
        }
      })
      .execute();

    return NextResponse.json(productsResponse.body.results);
  } catch {
    return NextResponse.json(
      { error: ERROR_MESSAGES[ERROR_CODE.FailedToFetchProducts] },
      { status: 500 }
    );
  }
}
