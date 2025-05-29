import { NextRequest, NextResponse } from 'next/server';
import { createCredentialsClient } from '@/services/commercetools/client/createCredentialsClient';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { combineStringAndValues } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const searchParams = await req.json();
    const { idCategory, limit, offset, sort, term, prices, colors, sizes, brands } = searchParams;

    const client = createCredentialsClient();

    const filters = [
      { key: 'variants.attributes.color.key', values: colors },
      { key: 'variants.attributes.size.key', values: sizes },
      { key: 'variants.attributes.brand.key', values: brands }
    ];

    const queryParams: {
      filter: string[];
      sort: string[];
      'text.en-US': string;
      limit: number;
      offset: number;
    } = {
      filter: [`variants.price.centAmount:range("${prices[0] * 100}" to "${prices[1] * 100}")`],
      sort,
      'text.en-US': `${term}`,
      limit,
      offset
    };

    if (idCategory) queryParams.filter.push(`categories.id:"${idCategory}"`);

    filters.forEach((filter) => {
      if (filter.values.length > 0) {
        queryParams.filter.push(combineStringAndValues(filter.key, filter.values));
      }
    });

    const response = await client
      .productProjections()
      .search()
      .get({
        queryArgs: queryParams
      })
      .execute();

    const data = response.body as ProductProjectionPagedSearchResponse;

    return NextResponse.json({
      results: data.results,
      total: data.total
    });
  } catch (error) {
    console.error('Error in /api/products:', error);

    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
