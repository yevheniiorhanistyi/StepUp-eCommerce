'use client';

import { ProductProjection } from '@commercetools/platform-sdk';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';

const AllTimeFavorites = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all-time-favorites');
        if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
        const data: ProductProjection[] = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('Unknown error');
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-4 sm:px-10 py-5 relative w-full">
      <div className="relative flex flex-col items-center justify-between gap-2 xl:gap-0 w-full h-full max-w-[1440px] mx-auto z-10">
        <h2 className="text-2xl self-start mb-7">All Time Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-start gap-4 xl:gap-2 w-full">
          {products.map((product) => {
            const image = product.masterVariant.images?.[0];
            const price = product.masterVariant.prices?.[0];

            if (!image || !price) return null;

            return (
              <Link
                href={`/product/${product.key}`}
                key={product.id}
                className="max-w-[364px] xl:max-w-[250px] w-full justify-self-center"
              >
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg py-3">
                  <CardContent>
                    <div className="relative w-full h-[200px] mb-2">
                      <Image
                        src={image.url}
                        alt={product.name['en-US']}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 364px"
                        className="rounded-md"
                      />
                    </div>
                    <h3 className="font-medium text-lg mb-2">{product.name['en-US']}</h3>
                    <p className="text-base sm:-tracking-tight mb-2">
                      {price.value.centAmount / 100}$
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllTimeFavorites;
