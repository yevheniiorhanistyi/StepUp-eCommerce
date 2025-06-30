'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { IAuthContextType, IAuthStatus } from '@/types/types';
import { Customer } from '@commercetools/platform-sdk';
import { AUTH_API, USER_API } from '@/constants/constants';

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthentication] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [user, setUser] = useState<Customer | null>(null);
  const [isUserLoading, setUserLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await fetch(AUTH_API.Logout, { method: 'DELETE' });
    } catch (error) {
      console.error('Logout API failed', error);
    }

    setAuthentication(false);
    setUser(null);
    setUserLoading(false);
    setIsAuthChecked(true);
  }, []);

  const refreshUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const userResponse = await fetch(USER_API.Me);

      if (userResponse.status === 401) {
        await logout();

        return;
      }

      if (!userResponse.ok) throw new Error('Failed to fetch user info');

      const userData: Customer = await userResponse.json();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(AUTH_API.Status);
        if (!res.ok) throw new Error('Failed to fetch auth status');

        const data: IAuthStatus = await res.json();

        if (data.hasAccessToken && data.shouldRefresh) {
          const refreshRes = await fetch(AUTH_API.Refresh, { method: 'POST' });
          if (!refreshRes.ok) throw new Error('Failed to refresh token');
        }

        setAuthentication(data.isAuthenticated);

        if (data.isAuthenticated) {
          await refreshUser();
        } else {
          await logout();
        }
      } catch {
        await logout();
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, [refreshUser, logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        user,
        setUser,
        isUserLoading,
        setUserLoading,
        refreshUser,
        isAuthChecked,
        setIsAuthChecked,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
