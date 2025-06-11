import { formatPrice } from './price-utils';
import { IPriceDisplayProps } from '@/types/types';

const PriceDisplay = ({ price }: IPriceDisplayProps) => {
  return price.discounted ? (
    <div className={'flex items-center gap-2'}>
      <span className="text-primary">{formatPrice(price.discounted.value)}</span>
      <span className="text-sm line-through text-gray-500">{formatPrice(price.value)}</span>
    </div>
  ) : (
    <span>{formatPrice(price.value)}</span>
  );
};

export default PriceDisplay;
