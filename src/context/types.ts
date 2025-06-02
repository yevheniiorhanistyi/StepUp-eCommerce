import { Customer } from '@commercetools/platform-sdk';

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
