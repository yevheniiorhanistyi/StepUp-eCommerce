import { RegisterFormFields } from '@/types/register';
import { ISearchParams } from '@/types/types';

export enum ROUTES {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Profile = '/profile'
}

export const enum ENV_KEY {
  API_URL = 'NEXT_PUBLIC_API_URL',
  AUTH_URL = 'NEXT_PUBLIC_AUTH_URL',
  PROJECT_KEY = 'NEXT_PUBLIC_PROJECT_KEY',
  CLIENT_ID = 'NEXT_PUBLIC_CLIENT_ID',
  CLIENT_SECRET = 'NEXT_PUBLIC_CLIENT_SECRET',
  SCOPES = 'NEXT_PUBLIC_SCOPES'
}

export const COOKIE_MAX_AGE = {
  ThirtyDays: 60 * 60 * 24 * 30,
  OneHour: 60 * 60
};

export enum ErrorCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  TokenStoreInvalid = 'TOKEN_STORE_INVALID',
  RefreshTokenMissing = 'REFRESH_TOKEN_MISSING',
  RefreshFailed = 'REFRESH_FAILED',
  AddProductToCartFailed = 'ADD_PRODUCT_TO_CART_FAILED',
  InvalidCartIdOrCartVersion = 'INVALID_CART_ID_OR_CART_VERSION',
  DiscountCodeRequired = 'DISCOUNT_CODE_REQUIRED',
  ApplyDiscountCodeFailed = 'APPLY_DISCOUNT_CODE_FAILED',
  RemoveProductFromCartFailed = 'REMOVE_PRODUCT_FROM_CART_FAILED',
  FailedToFetchCart = 'FAILED_TO_FETCH_CART',
  FailedToFetchProducts = 'FAILED_TO_FETCH_PRODUCTS',
  MissingOrInvalidRequiredFields = 'MISSING_OR_INVALID_REQUIRED_FIELDS',
  UpdateItemQuantityFailed = 'UPDATE_ITEM_QUANTITY_FAILED',
  NotAuthenticated = 'NOT_AUTHENTICATED'
}

export const ERROR_MESSAGES = {
  [ErrorCode.InvalidCredentials]: 'Incorrect email or password.',
  [ErrorCode.TokenStoreInvalid]: 'Authentication token could not be retrieved.',
  [ErrorCode.RefreshTokenMissing]: 'Refresh token not found.',
  [ErrorCode.RefreshFailed]: 'Failed to refresh token.',
  [ErrorCode.AddProductToCartFailed]: 'Failed to add product to cart',
  [ErrorCode.InvalidCartIdOrCartVersion]: 'Invalid cartId or cartVersion',
  [ErrorCode.DiscountCodeRequired]: 'Discount code is required',
  [ErrorCode.ApplyDiscountCodeFailed]: 'Failed to apply discount code!',
  [ErrorCode.RemoveProductFromCartFailed]: 'Failed to remove product from cart',
  [ErrorCode.FailedToFetchCart]: 'Failed to fetch cart',
  [ErrorCode.FailedToFetchProducts]: 'Failed to fetch products',
  [ErrorCode.UpdateItemQuantityFailed]: 'Failed to update item quantity:',
  [ErrorCode.MissingOrInvalidRequiredFields]: 'Missing or invalid required fields',
  [ErrorCode.NotAuthenticated]: 'Not authenticated'
};

export const REGISTER_INITIAL_VALUES: RegisterFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  billingAddress: {
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
    isDefault: true
  },
  shippingAddress: {
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
    isDefault: true,
    useSame: true
  }
};

export const ANNOUNCEMENT_TEXTS = {
  seasonalSale: {
    text: ['Seasonal savings are here! Shop our bestsellers before they are gone!'],
    promoCode: ['Use code SUMMER25 at checkout and get 25% off!']
  },
  heroPromo: {
    label: 'Your shoes say a lot about you — and at StepUp, we help you say it louder.',
    text: [
      'Explore a curated selection of sneakers that reflect your energy, ambitions, and personal style.',
      'From bold colors to sleek silhouettes, every pair in our store is chosen to support your individuality, performance, and everyday comfort.'
    ]
  },
  socialCall: {
    label: 'Let’s Get Social!',
    text: [
      'Sneaker inspo, styling tips, and cool community vibes — connect with us on your favorite platforms.'
    ],
    socials: true
  }
};

export const BRAND_LOGOS = [
  'asics.png',
  'converse.png',
  'ellesse.png',
  'lacoste.png',
  'new-balance.png',
  'nike.png',
  'puma.png'
];

export const SOCIAL_LOGOS = [
  'youtube.png',
  'facebook.png',
  'instagram.png',
  'pinterest.png',
  'twitter.png'
];

export const countries = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CA', name: 'Canada' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DE', name: 'Germany' },
  { code: 'DK', name: 'Denmark' },
  { code: 'ES', name: 'Spain' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'SE', name: 'Sweden' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'US', name: 'United States' }
];

export const ITEMS_PER_PAGE = 6;

export const INITIAL_SEARCH_PARAMS: ISearchParams = {
  offset: 0,
  limit: ITEMS_PER_PAGE,
  term: '',
  sort: 'price asc',
  colors: [],
  sizes: [],
  brands: [],
  prices: [0, 1000]
};

export const SORTING_OPTIONS = [
  { label: 'Name: A - Z', value: 'name.en-us asc' },
  { label: 'Name: Z - A', value: 'name.en-us desc' },
  { label: 'Price: Low - High', value: 'price asc' },
  { label: 'Price: High - Low', value: 'price desc' }
];

export const BRANDS = [
  { label: 'Addidas', value: 'Addidas' },
  { label: 'Nike', value: 'Nike' },
  { label: 'ECCO', value: 'ECCO' },
  { label: 'Fila', value: 'Fila' },
  { label: 'Puma', value: 'Puma' },
  { label: 'Reebok', value: 'Reebok' },
  { label: 'Lacoste', value: 'Lacoste' },
  { label: 'New Balance', value: 'New Balance' },
  { label: 'Ellesse', value: 'Ellesse' },
  { label: 'Converse', value: 'Converse' },
  { label: 'Asics', value: 'Asics' }
];

export const SIZES = [
  { label: '33', value: '33' },
  { label: '34', value: '34' },
  { label: '35', value: '35' },
  { label: '36', value: '36' },
  { label: '37', value: '37' },
  { label: '38', value: '38' },
  { label: '39', value: '39' },
  { label: '40', value: '40' },
  { label: '41', value: '41' },
  { label: '42', value: '42' },
  { label: '43', value: '43' },
  { label: '44', value: '44' },
  { label: '45', value: '45' },
  { label: '46', value: '46' }
];

export const COLORS = [
  { label: 'Black', value: '#000000' },
  { label: 'Red', value: '#B22222' },
  { label: 'Blue', value: '#2A52BE' },
  { label: 'Green', value: '#407921' },
  { label: 'Pink', value: '#D990A3' },
  { label: 'White', value: '#FFFFFF' },
  { label: 'Gray', value: '#B0B0B0' },
  { label: 'Yellow', value: '#F0C300' }
];

export const LANGUAGE_CODE = 'en-US';
