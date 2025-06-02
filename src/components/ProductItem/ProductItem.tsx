import Link from 'next/link';
import Image from 'next/image';
import { IProductItemParams } from '@/types/types';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '../ui/card';
import { calculatePrices } from '@/lib/utils';

const ProductItem = ({ product }: IProductItemParams) => {
  const image = product.masterVariant.images?.[0];
  const price = product.masterVariant.prices?.[0];
  const description = product?.description?.['en-US'];
  const { key } = product;

  if (!image || !price || !description || !key) return null;

  const { originalPrice, hasDiscount, discountedPrice } = calculatePrices(price);

  return (
    <Link href={`/product/${key}`} key={product.id} className="w-full justify-self-center">
      <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg py-2 gap-2">
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
        <CardFooter className="flex items-center gap-3 text-lg">
          {hasDiscount ? (
            <>
              <span>${discountedPrice}</span>
              <span className="line-through text-muted-foreground">${originalPrice}</span>
            </>
          ) : (
            <span>${originalPrice}</span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductItem;
