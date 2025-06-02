import { ISearchParams } from '@/types/types';
import { createCredentialsClient } from '@/services/commercetools/client/createCredentialsClient';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { combineStringAndValues } from '@/lib/utils';

export const getProductsByParams = async (
  idCategory: string | undefined,
  { offset, term, limit, sort, colors, sizes, brands, prices }: ISearchParams
) => {
  const client = createCredentialsClient();

  const filters = [
    { key: 'variants.attributes.color.key', values: colors },
    { key: 'variants.attributes.size.key', values: sizes },
    { key: 'variants.attributes.brand.key', values: brands }
  ];

  const queryParams: {
    filter: string[];
    sort: string;
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

  return {
    results: data.results,
    total: data.total ?? 0
  };
};
