import Link from 'next/link';

import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '../ui/card';

import { Product } from '@/types/types';

import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.key}`}>
      <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg py-2 gap-2">
        <CardContent>
          <div className="relative w-full aspect-[5/4]">
            <img
              loading="lazy"
              className="object-contain rounded-md w-full h-full"
              src={product.images[0]}
              alt={product.name}
            />
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-3 text-lg pb-3">
          <PriceDisplay price={product.prices[0]} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductItem;
