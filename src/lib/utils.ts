import { Price } from '@commercetools/platform-sdk';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEnvVar = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value;
};

export const calculatePrices = (prices: Price) => {
  const discountedPrice = prices.discounted?.value
    ? (prices.discounted.value.centAmount / 10 ** 2).toFixed(2)
    : '';
  const originalPrice = prices.value ? (prices.value.centAmount / 10 ** 2).toFixed(2) : '';
  const hasDiscount = discountedPrice && discountedPrice !== originalPrice;

  return {
    discountedPrice,
    originalPrice,
    hasDiscount
  };
};

export const combineStringAndValues = (inputString: string, values: string[]): string => {
  const formattedValues = values.map((val) => `"${val}"`);
  const formattedString = formattedValues.join(',');
  const resultString = `${inputString}:${formattedString}`;

  return resultString;
};
