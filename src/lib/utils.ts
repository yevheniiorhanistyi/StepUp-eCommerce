import { Address, Category, CustomerDraft } from '@commercetools/platform-sdk';
import { ICategoryNode } from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RegisterFormFields, UserAddress } from '@/types/register';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import handleErrors from '@/services/register/handleErrors';
import { LANGUAGE_CODE } from '@/constants/constants';

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

  return matches ? decodeURIComponent(matches[1]) : '';
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

  const current = categories.find((cat) => cat.slug[LANGUAGE_CODE] === slug);
  if (!current) return [];

  const ancestors = getCategoryAncestors(current, map);

  return [...ancestors, current];
}

export const getInitials = (firstName: string, lastName: string) =>
  `${(firstName?.[0] ?? '').toUpperCase()}${(lastName?.[0] ?? '').toUpperCase()}`;

export const priceFormat = (value: number | string = 0): string =>
  typeof value === 'string' ? value : value.toFixed(2);

const mapFormData = (formData: RegisterFormFields): CustomerDraft => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    billingAddress,
    shippingAddress
  } = formData;

  const useSame = shippingAddress.useSame === true;
  const billingIsDefault = billingAddress.isDefault === true;
  const shippingIsDefault = shippingAddress.isDefault === true;

  const mappedBillingAddress = mapAddress(billingAddress, {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phoneNumber
  });
  const mappedShippingAddress = useSame
    ? mappedBillingAddress
    : mapAddress(shippingAddress, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber
      });

  const addresses: Address[] = useSame
    ? [mappedBillingAddress]
    : [mappedBillingAddress, mappedShippingAddress];

  return {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    defaultBillingAddress: billingIsDefault ? 0 : undefined,
    defaultShippingAddress: shippingIsDefault ? (useSame ? 0 : 1) : undefined,
    billingAddresses: [0],
    shippingAddresses: [useSame ? 0 : 1],
    custom: {
      type: {
        typeId: 'type',
        key: 'customer-data'
      },
      fields: {
        phoneNumber: phoneNumber
      }
    }
  };
};

function mapAddress(
  address: UserAddress,
  contact: { firstName: string; lastName: string; email?: string; phone?: string }
): Address {
  const { useSame, isDefault, ...rest } = address;
  void useSame;
  void isDefault;

  return {
    ...rest,
    ...contact
  };
}

export default mapFormData;

export function buildCustomerDraft(formData: RegisterFormFields): CustomerDraft & {
  anonymousId: string;
  activeCartSignInMode: 'MergeWithExistingCustomerCart';
} {
  return {
    ...mapFormData(formData),
    anonymousId: getCookieValue('anonymous_id'),
    activeCartSignInMode: 'MergeWithExistingCustomerCart'
  };
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
  const apiRoot = createAnonymousClient();

  try {
    const response = await apiRoot
      .customers()
      .get({ queryArgs: { where: `email="${email}"` } })
      .execute();

    return response.body.total === 0;
  } catch (error) {
    const handledError = handleErrors(error);
    throw handledError;
  }
}
