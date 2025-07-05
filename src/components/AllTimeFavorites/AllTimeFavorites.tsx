import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

import products from '@/data/all-time-favorites.json';

const AllTimeFavorites = (): JSX.Element => {
  return (
    <section className="px-4 sm:px-10 py-5 relative w-full">
      <div className="relative flex flex-col items-center justify-between gap-2 xl:gap-0 w-full h-full max-w-[1440px] mx-auto z-10">
        <h2 className="text-2xl self-start mb-7">All Time Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-start gap-4 xl:gap-2 w-full">
          {products.map((product) => {
            const image = product.images[0];
            const price = product.prices[0];

            return (
              <Link
                href={`/product/${product.key}`}
                key={product.id}
                className="max-w-[364px] xl:max-w-[250px] w-full justify-self-center"
              >
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg py-3">
                  <CardContent>
                    <div className="relative w-full h-[200px] mb-2">
                      <img
                        loading="lazy"
                        className="object-contain rounded-md w-full h-full"
                        src={image}
                        alt={product.name}
                      />
                    </div>
                    <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                    <PriceDisplay price={price} />
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
