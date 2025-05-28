import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getProductByKey } from '@/lib/commercetools';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/price-utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ProductSizeSelector } from '@/components/ProductSizeSelector/product-size-selector';

type Props = {
  params: { key: string };
};

const ATTRIBUTE_NAME = 'size';

export default async function ProductPage(props: Props) {
  const { key } = await props.params;

  if (!key) return notFound();

  const product = await getProductByKey(key);

  if (!product) return notFound();

  const { current } = product.masterData;
  const { masterVariant, variants } = current;
  const allVariants = [masterVariant, ...variants];

  const mainImage = masterVariant.images?.[0];
  const price = masterVariant.prices?.[0];
  const categories = current.categories
    .map((category) => category.obj?.name?.['en-US'])
    .filter((categoryName) => categoryName && categoryName !== 'All-Time Favorites')
    .join(' / ');

  const sizeVariants = allVariants
    .map((variant) => {
      const sizeAttr = variant.attributes?.find((attr) => attr.name === ATTRIBUTE_NAME)?.value;
      const size = typeof sizeAttr === 'object' && sizeAttr !== null ? sizeAttr.label : sizeAttr;
      const variantKey = variant.key;

      if (!size || !variantKey) return null;

      return {
        key: variantKey,
        size
      };
    })
    .filter(Boolean) as Array<{ key: string; size: string }>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] grid-rows-[auto_auto] gap-x-6 gap-y-4 md:gap-y-2">
        <div className="row-start-1 col-span-1 md:col-start-1 flex flex-col sm:flex-row gap-16">
          {masterVariant.images && masterVariant.images.length > 1 && (
            <div className="hidden sm:flex flex-col space-y-3">
              {masterVariant.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative w-20 aspect-square rounded-md overflow-hidden hover:cursor-pointer"
                >
                  <Image
                    src={image.url}
                    alt={`${current.name['en-US']} - ${index + 2}`}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          )}

          {mainImage && (
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={mainImage.url}
                alt={current.name['en-US']}
                width={600}
                height={450}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          )}
        </div>

        <div className="row-start-2 md:row-start-1 md:col-start-2 flex flex-col space-y-4">
          <div>
            <span className="text-sm text-gray-500">{categories}</span>
            <h1 className="text-2xl md:text-3xl font-bold">{current.name['en-US']}</h1>
          </div>

          {price && (
            <div className="text-xl font-medium">
              {price.discounted ? (
                <div className="flex items-center space-y-3">
                  <span className="text-primary">{formatPrice(price.discounted.value)}</span>
                  <span className="text-sm line-through text-gray-500">
                    {formatPrice(price.value)}
                  </span>
                </div>
              ) : (
                <span>{formatPrice(price.value)}</span>
              )}
            </div>
          )}

          <div>
            <div className="mb-1">Select Size</div>
            <ProductSizeSelector variants={sizeVariants} currentKey={key} />
          </div>

          <div className="md:w-auto md:max-w-[200px]">
            <Button size="lg">Add to cart</Button>
          </div>
        </div>

        {current.description && (
          <div className="row-start-3 md:row-start-2 col-span-1 md:col-start-1 max-w-prose">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg border-b pt-0 pl-2 pb-0 hover:no-underline">
                  Description
                </AccordionTrigger>
                <AccordionContent className="pt-2 pl-2 pb-0">
                  {current.description['en-US']}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
