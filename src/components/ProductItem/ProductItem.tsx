'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '../ui/card';

import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import ProductCartButton from '../ProductCartButton/ProductCartButton';
import { ProductProjection } from '@commercetools/platform-sdk';

const ProductItem = ({ product }: { product: ProductProjection }) => {
  const router = useRouter();

  const image = product.masterVariant.images?.[0];
  const price = product.masterVariant.prices?.[0];
  const description = product?.description?.['en-US'];
  const { key } = product;

  const handleCardClick = () => {
    router.push(`/product/${key}`);
  };

  if (!image || !price || !description || !key) return null;

  return (
    <Card
      className="h-full cursor-pointer transition-shadow hover:shadow-lg py-2 gap-2"
      onClick={handleCardClick}
    >
      <CardContent>
        <div className="relative w-full aspect-[5/4]">
          <Image
            src={image.url}
            alt={product.name['en-US']}
            priority
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 364px"
            className="rounded-md"
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name['en-US']}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description['en-US']}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-3 text-lg pb-3">
        <PriceDisplay price={price} />
        <ProductCartButton product={product} productId={product.id} />
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
