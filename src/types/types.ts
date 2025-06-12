import { ProductProjection, Category, Customer } from '@commercetools/platform-sdk';

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
