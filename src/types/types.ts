import {
  ProductProjection,
  Category,
  Customer,
  Cart,
  LineItemDraft,
  ErrorResponse,
  Product,
  ByProjectKeyRequestBuilder,
  MyCustomerSignin
} from '@commercetools/platform-sdk';
import { ReactNode } from 'react';

export interface IAuthContextType {
  isAuthenticated: boolean;
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
  user: Customer | null;
  setUser: (data: Customer | null) => void;
  isUserLoading: boolean;
  setUserLoading: (value: boolean) => void;
  refreshUser: () => Promise<void>;
  isAuthChecked: boolean;
  setIsAuthChecked: (value: boolean) => void;
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
  shouldRefresh: boolean;
}

export interface ISearchParams {
  offset: number;
  limit: number;
  term: string;
  sort: string;
  colors: string[];
  sizes: string[];
  brands: string[];
  prices: [number, number];
}

export interface ICategoryItem {
  label: string;
  value: string;
}

export interface ICategoryMenuProps {
  categorySlug: string;
  onCategoryClick: (slug: string) => void;
}

export interface ICategoryNode extends Category {
  children: ICategoryNode[];
}

export interface ISearchParamsArrayTypes {
  colors: string;
  sizes: string;
  brands: string;
}

export interface IProductItemParams {
  product: ProductProjection;
}

export interface IProductListParams {
  products: ProductProjection[];
  isLoading: boolean;
}

export interface ICommonCatalogProps {
  searchParams: ISearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchParams>>;
}

export interface ISidebarFilterGroupProps extends ICommonCatalogProps {
  label: string;
  labelList: ICategoryItem[];
  propertyToChange: keyof ISearchParamsArrayTypes;
}

export interface ICatalogSidebarProps extends ICommonCatalogProps {
  categorySlug: string;
  onCategoryClick: (slug: string) => void;
}

export interface IAppPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface TeamContributionModalProps {
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
  onClose: () => void;
  contributions: { image: string; title: string; description: string }[];
}

export interface IPrice {
  centAmount: number;
  currencyCode: string;
}

export interface IPriceDisplayProps {
  price: {
    value: IPrice;
    discounted?: {
      value: IPrice;
    };
  };
}

export interface ICartContextType {
  cart: Cart | undefined | null;
  addItem: (item: LineItemDraft) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  removeItemsByProductKey: (productKey: string) => Promise<void>;
  updateItemQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => Promise<void>;
  addPromoCode: (code: string) => Promise<void>;
}

export interface ICreateCartParams {
  client: ByProjectKeyRequestBuilder;
  lineItem: LineItemDraft;
  customerId?: string;
  anonymousId?: string;
}

export interface IAddLineItemParams {
  client: ByProjectKeyRequestBuilder;
  cartId: string;
  cartVersion: number;
  lineItem: LineItemDraft;
}

export interface IProductSizePickerProps {
  product: Product;
  variants: Array<{ key: string; size: string }>;
}

export interface IAnnouncementBannerProps {
  label?: string;
  text: string[];
  socials?: boolean;
}

export interface IDrawerMenuProps {
  navLinks: { href: string; label: string }[];
  isAuthenticated: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ILayoutProps {
  children: ReactNode;
}

export interface IProductCartButtonProps {
  isInCart: boolean;
  isProcessing: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export interface IProductSliderProps {
  images: { url: string }[];
  productName: string;
}

export interface ICommercetoolsError {
  body: ErrorResponse;
}

export interface ICustomerSignInResult {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token?: string;
}

export interface IUserDropdownMenuProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IModalSliderProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string }[];
  productName: string;
  initialIndex: number;
}

export interface ICustomerSignin extends MyCustomerSignin {
  email: string;
  password: string;
  anonymousId?: string;
  activeCartSignInMode?: 'MergeWithExistingCustomerCart' | 'ReplaceWithEmptyCustomerCart';
}
