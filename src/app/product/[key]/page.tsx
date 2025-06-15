import { getProductByKey } from '@/services/getProductByKey';
import { notFound } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ProductSlider } from '@/components/ProductSlider/ProductSlider';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

import ProductSizePicker from '@/components/ProductSizePicker/ProductSizePicker';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

const ATTRIBUTE_NAME = 'size';

export default async function ProductPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!key) return notFound();

  const product = await getProductByKey(key);

  if (!product) return notFound();

  const { current } = product.masterData;
  const { masterVariant, variants } = current;
  const allVariants = [masterVariant, ...variants];

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
        <ProductSlider images={masterVariant.images ?? []} productName={current.name['en-US']} />

        <div className="row-start-2 md:row-start-1 md:col-start-2 flex flex-col space-y-4">
          <div>
            <span className="text-sm text-gray-500">{categories}</span>
            <h1 className="text-2xl md:text-3xl font-bold">{current.name['en-US']}</h1>
          </div>

          {price && (
            <div className="text-xl font-medium">
              <PriceDisplay price={price} />
            </div>
          )}

          <ProductSizePicker product={product} variants={sizeVariants} />
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
