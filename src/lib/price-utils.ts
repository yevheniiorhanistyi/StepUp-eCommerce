import { LANGUAGE_CODE } from '@/constants/constants';

export function formatPrice(price: { centAmount: number; currencyCode: string }) {
  return new Intl.NumberFormat(LANGUAGE_CODE, {
    style: 'currency',
    currency: price.currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price.centAmount / 100);
}
