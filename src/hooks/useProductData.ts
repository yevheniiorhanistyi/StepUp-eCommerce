'use client';

import { useState, useEffect } from 'react';
import { ISearchParams } from '@/types/types';
import { getPrice } from '@/lib/utils';

import products from '@/data/all-time-favorites.json';

export const useProductData = (
  searchParams: ISearchParams,
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchParams>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const [productList, setProductList] = useState<typeof products>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const CENTS_IN_DOLLAR = 100;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let filtered = [...products];

        if (Array.isArray(searchParams.category) && searchParams.category.length > 0) {
          filtered = filtered.filter((product) =>
            product.category.some((cat) => searchParams.category.includes(cat.toLowerCase()))
          );
        }

        if (searchParams.term) {
          const search = searchParams.term.toLowerCase();
          filtered = filtered.filter((product) => product.name.toLowerCase().includes(search));
        }

        if (searchParams.brands?.length) {
          filtered = filtered.filter((product) => {
            const brandAttr = product.attributes.find((attr) => attr.name === 'brand')?.value;

            return (
              !Array.isArray(brandAttr) && brandAttr && searchParams.brands.includes(brandAttr.key)
            );
          });
        }

        if (searchParams.colors?.length) {
          filtered = filtered.filter((product) => {
            const colorAttr = product.attributes.find((attr) => attr.name === 'color')?.value;

            return (
              !Array.isArray(colorAttr) && colorAttr && searchParams.colors.includes(colorAttr.key)
            );
          });
        }

        if (searchParams.sizes?.length) {
          filtered = filtered.filter((product) => {
            const sizeAttr = product.attributes.find((attr) => attr.name === 'size')?.value;

            return (
              Array.isArray(sizeAttr) &&
              sizeAttr.some((size) => searchParams.sizes.includes(size.key))
            );
          });
        }

        filtered = filtered.filter((product) => {
          const rawPrice = product.prices?.[0];
          if (!rawPrice) return false;

          const hasDiscount = 'discounted' in rawPrice;
          const price = hasDiscount
            ? rawPrice.discounted.value.centAmount
            : rawPrice.value.centAmount;

          const min = (searchParams.prices?.[0] ?? 0) * CENTS_IN_DOLLAR;
          const max = (searchParams.prices?.[1] ?? Infinity) * CENTS_IN_DOLLAR;

          return price >= min && price <= max;
        });

        if (searchParams.sort) {
          filtered.sort((a, b) => {
            switch (searchParams.sort) {
              case 'name.en-us asc':
                return a.name.localeCompare(b.name);
              case 'name.en-us desc':
                return b.name.localeCompare(a.name);
              case 'price asc': {
                const priceA = getPrice(a);
                const priceB = getPrice(b);

                return priceA - priceB;
              }
              case 'price desc': {
                const priceA = getPrice(a);
                const priceB = getPrice(b);

                return priceB - priceA;
              }
              default:
                return 0;
            }
          });
        }

        const total = filtered.length;

        const offset = searchParams.offset || 0;
        const limit = searchParams.limit || 6;

        const paginated = filtered.slice(offset, offset + limit);

        if (paginated.length === 0 && total > 0) {
          setCurrentPage(0);
          setSearchParams({ ...searchParams, offset: 0 });

          return;
        }

        setTimeout(() => {
          setProductList(paginated);
          setTotalElements(total);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading mock data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams, setCurrentPage, setSearchParams]);

  return { productList, totalElements, isLoading };
};
