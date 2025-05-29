import { NextResponse } from 'next/server';
import { createCredentialsClient } from '@/services/commercetools/client/createCredentialsClient';

export async function GET() {
  try {
    const client = createCredentialsClient();
    const response = await client.categories().get().execute();

    return NextResponse.json(response.body.results);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
