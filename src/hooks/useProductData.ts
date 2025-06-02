'use client';

import { useState, useEffect } from 'react';
import { ISearchParams } from '@/types/types';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProductsByParams } from '@/services/getProductsByParams';

export const useProductData = (
  idCategory: string | undefined,
  searchParams: ISearchParams,
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchParams>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { results, total } = await getProductsByParams(idCategory, searchParams);

        if (results.length === 0 && total > 0) {
          setCurrentPage(0);
          setSearchParams({ ...searchParams, offset: 0 });

          return;
        }

        setProductList(results);
        setTotalElements(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCategory, searchParams]);

  return { productList, totalElements, isLoading };
};
