import { ISearchParams } from '@/types/types';

export const ANNOUNCEMENT_TEXTS = {
  seasonalSale: {
    text: ['Seasonal savings are here! Shop our bestsellers before they are gone!']
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
  { label: 'Black', value: 'Black' },
  { label: 'Red', value: 'Red' },
  { label: 'Blue', value: 'Blue' },
  { label: 'Green', value: 'Green' },
  { label: 'Pink', value: 'Pink' },
  { label: 'White', value: 'White' },
  { label: 'Gray', value: 'Gray' },
  { label: 'Yellow', value: 'Yellow' }
];

export const LANGUAGE_CODE = 'en-US';
