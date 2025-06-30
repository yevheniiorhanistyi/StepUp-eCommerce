import { Category } from '@commercetools/platform-sdk';
import { ICategoryNode, Product } from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEnvVar = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value;
};

export const getCookieValue = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const combineStringAndValues = (inputString: string, values: string[]): string => {
  const formattedValues = values.map((val) => `"${val}"`);
  const formattedString = formattedValues.join(',');
  const resultString = `${inputString}:${formattedString}`;

  return resultString;
};

export const buildCategoryTree = (categories: Category[]): ICategoryNode[] => {
  const categoryMap = new Map<string, ICategoryNode>();

  categories.forEach((cat) => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });

  const tree: ICategoryNode[] = [];

  categories.forEach((cat) => {
    const node = categoryMap.get(cat.id)!;
    const ancestor = cat.ancestors.at(-1);

    if (ancestor && categoryMap.has(ancestor.id)) {
      categoryMap.get(ancestor.id)!.children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
};

export const getCategoryAncestors = (
  category: Category,
  categoryMap: Map<string, Category>
): Category[] => {
  const ancestors: Category[] = [];

  let current = category;

  while (current.parent && current.parent.id) {
    const parent = categoryMap.get(current.parent.id);
    if (!parent) break;

    ancestors.unshift(parent);
    current = parent;
  }

  return ancestors;
};

export function getCategoryBreadcrumb(slug: string, categories: Category[]) {
  const map = new Map<string, Category>();
  categories.forEach((cat) => map.set(cat.id, cat));

  const current = categories.find((cat) => cat.slug['en-US'] === slug);
  if (!current) return [];

  const ancestors = getCategoryAncestors(current, map);

  return [...ancestors, current];
}

export const getInitials = (firstName: string, lastName: string) =>
  `${(firstName?.[0] ?? '').toUpperCase()}${(lastName?.[0] ?? '').toUpperCase()}`;

export const priceFormat = (value: number | string = 0): string =>
  typeof value === 'string' ? value : value.toFixed(2);

export const getPrice = (product: Product): number => {
  const rawPrice = product.prices?.[0];
  if (!rawPrice) return Infinity;

  const hasDiscount = 'discounted' in rawPrice;

  return hasDiscount ? rawPrice.discounted.value.centAmount : rawPrice.value.centAmount;
};

export function initializeDemoUser() {
  const existingUser = localStorage.getItem('user');
  if (existingUser) return;

  const demoUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'Password123!',
    phoneNumber: '+48123456789',
    confirmPassword: 'Password123!',
    dateOfBirth: '1990-01-01',
    billingAddress: {
      id: crypto.randomUUID(),
      country: 'PL',
      city: 'Warsaw',
      streetName: 'Demo Street 1',
      postalCode: '00-001',
      isDefault: true
    },
    shippingAddress: {
      id: crypto.randomUUID(),
      country: 'PL',
      city: 'Warsaw',
      streetName: 'Demo Street 1',
      postalCode: '00-001',
      isDefault: true,
      useSame: true
    },
    version: 1
  };

  localStorage.setItem('user', JSON.stringify(demoUser));
}
