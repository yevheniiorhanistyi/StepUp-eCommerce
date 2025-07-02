export function formatPrice(price: { centAmount: number; currencyCode: string }) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price.centAmount / 100);
}
