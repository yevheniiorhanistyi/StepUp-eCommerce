'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IAuthContextType, IAuthStatus } from './types';
import { Customer } from '@commercetools/platform-sdk';

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
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/status');
        if (!res.ok) throw new Error('Failed to fetch auth status');

        const data: IAuthStatus = await res.json();

        if (data.hasAccessToken && data.shouldRefresh) {
          const refreshRes = await fetch('/api/auth/refresh', { method: 'POST' });
          if (!refreshRes.ok) throw new Error('Failed to refresh token');
        }

        setAuthentication(data.isAuthenticated);

        if (data.isAuthenticated) {
          const userResponse = await fetch('/api/user/me');
          if (!userResponse.ok) throw new Error('Failed to fetch user info');

          const userData: Customer = await userResponse.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch {
        await fetch('/api/auth/logout', { method: 'DELETE' });
        setAuthentication(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
