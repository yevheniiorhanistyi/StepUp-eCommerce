import { LineItem } from '@commercetools/platform-sdk';

const ProductSizeSelector = ({
  variants,
  currentKey,
  onChange,
  cartLineItems
}: {
  variants: Array<{ key: string; size: string }>;
  currentKey: string;
  onChange: (key: string) => void;
  cartLineItems: LineItem[];
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map(({ key, size }) => {
        const isActive = key === currentKey;
        const isInCart = cartLineItems.some((item) => item.variant.key === key);

        const buttonClasses = [
          'px-3 py-2 rounded-md text-sm border transition cursor-pointer',
          isActive
            ? 'bg-black text-white border-black'
            : isInCart
              ? 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80'
              : 'bg-white text-black border-gray-300 hover:border-black'
        ].join(' ');

        return (
          <button key={key} type="button" onClick={() => onChange(key)} className={buttonClasses}>
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default ProductSizeSelector;
