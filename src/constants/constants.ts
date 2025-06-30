import { RegisterFormFields } from '@/types/register';
import { ISearchParams } from '@/types/types';

export enum ROUTES {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Profile = '/profile',
  Cart = '/cart',
  Catalog = '/catalog',
  Product = '/product',
  About = '/about'
}

export const enum ENV_KEY {
  API_URL = 'NEXT_PUBLIC_API_URL',
  AUTH_URL = 'NEXT_PUBLIC_AUTH_URL',
  PROJECT_KEY = 'NEXT_PUBLIC_PROJECT_KEY',
  CLIENT_ID = 'NEXT_PUBLIC_CLIENT_ID',
  CLIENT_SECRET = 'NEXT_PUBLIC_CLIENT_SECRET',
  SCOPES = 'NEXT_PUBLIC_SCOPES'
}

export enum COOKIES {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  TokenExpiresAt = 'token_expires_at',
  IsAuthenticated = 'is_authenticated',
  UserFirstName = 'user_first_name',
  UserLastName = 'user_last_name',
  UserEmail = 'user_email',
  CustomerId = 'customer_id',
  AnonymousId = 'anonymous_id'
}

export const COOKIE_MAX_AGE = {
  ThirtyDays: 60 * 60 * 24 * 30,
  OneHour: 60 * 60
};

export enum ERROR_CODE {
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
  EmailAlreadyExists = 'USER_WITH_THIS_EMAIL_ALREADY_EXISTS',
  MissingOrInvalidRequiredFields = 'MISSING_OR_INVALID_REQUIRED_FIELDS',
  UpdateItemQuantityFailed = 'UPDATE_ITEM_QUANTITY_FAILED',
  NotAuthenticated = 'NOT_AUTHENTICATED',
  MissingVersion = 'MISSING_VERSION',
  EmailTaken = 'EMAIL_TAKEN'
}

export const ERROR_MESSAGES = {
  [ERROR_CODE.InvalidCredentials]: 'Incorrect email or password.',
  [ERROR_CODE.TokenStoreInvalid]: 'Authentication token could not be retrieved.',
  [ERROR_CODE.RefreshTokenMissing]: 'Refresh token not found.',
  [ERROR_CODE.RefreshFailed]: 'Failed to refresh token.',
  [ERROR_CODE.AddProductToCartFailed]: 'Failed to add product to cart',
  [ERROR_CODE.InvalidCartIdOrCartVersion]: 'Invalid cartId or cartVersion',
  [ERROR_CODE.DiscountCodeRequired]: 'Discount code is required',
  [ERROR_CODE.ApplyDiscountCodeFailed]: 'Failed to apply discount code!',
  [ERROR_CODE.RemoveProductFromCartFailed]: 'Failed to remove product from cart',
  [ERROR_CODE.FailedToFetchCart]: 'Failed to fetch cart',
  [ERROR_CODE.FailedToFetchProducts]: 'Failed to fetch products',
  [ERROR_CODE.UpdateItemQuantityFailed]: 'Failed to update item quantity:',
  [ERROR_CODE.MissingOrInvalidRequiredFields]: 'Missing or invalid required fields',
  [ERROR_CODE.EmailAlreadyExists]: 'User with this email already exists!',
  [ERROR_CODE.NotAuthenticated]: 'Not authenticated',
  [ERROR_CODE.MissingVersion]: 'Missing version',
  [ERROR_CODE.EmailTaken]: 'Email is already taken'
};

export enum AUTH_API {
  Login = '/api/auth/login',
  Logout = '/api/auth/logout',
  Refresh = '/api/auth/refresh',
  Status = '/api/auth/status'
}

export enum CART_API {
  GetCart = '/api/cart',
  AddItem = '/api/cart/add-item',
  AddPromo = '/api/cart/add-promo',
  RemoveItem = '/api/cart/remove-item',
  RemoveItems = '/api/cart/remove-multiple',
  UpdateItem = '/api/cart/update-item'
}

export enum PRODUCTS_API {
  Favorites = '/api/products/favorites'
}

export enum USER_API {
  Me = '/api/user/me',
  Password = '/api/user/password',
  Update = '/api/user/update'
}

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
