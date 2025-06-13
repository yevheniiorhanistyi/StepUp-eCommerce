'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { IProductItemParams } from '@/types/types';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

const ProductItem = ({ product, cartItems, addItem, removeItem }: IProductItemParams) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const image = product.masterVariant.images?.[0];
  const price = product.masterVariant.prices?.[0];
  const description = product?.description?.['en-US'];
  const { key } = product;

  const isInCart = cartItems.some((item) => item.productId === product.id);

  const handleCardClick = () => {
    router.push(`/product/${key}`);
  };

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsProcessing(true);

    if (isInCart) {
      const lineItem = cartItems.find((item) => item.productId === product.id);
      if (lineItem) {
        await removeItem(lineItem.id);
      }
    } else {
      await addItem({
        productId: product.id,
        variantId: product.masterVariant.id,
        quantity: 1
      });
    }

    setIsProcessing(false);
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
        <Button
          size="lg"
          className="w-full transition-colors duration-0 cursor-pointer"
          variant={isInCart ? 'secondary' : 'default'}
          onClick={handleButtonClick}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div
                className={`h-4 w-4 animate-spin rounded-full border-2 ${
                  isInCart
                    ? 'border-black border-t-transparent'
                    : 'border-white border-t-transparent'
                }`}
              />
            </div>
          ) : isInCart ? (
            'Remove from cart'
          ) : (
            'Add to cart'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
