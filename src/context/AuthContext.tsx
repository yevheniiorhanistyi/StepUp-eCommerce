'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IAuthContextType } from '@/types/types';
import { Customer } from '@/types/types';

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

  const refreshUser = () => {
    const data = localStorage.getItem('user');
    const userData = data ? JSON.parse(data) : null;
    setUser(userData);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/status');
        const { isAuthenticated } = await res.json();

        if (isAuthenticated) {
          refreshUser();
          setAuthentication(true);
        }
      } catch {
        setAuthentication(false);
        setUser(null);
      } finally {
        setUserLoading(false);
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        user,
        setUser,
        refreshUser,
        isUserLoading,
        setUserLoading,
        isAuthChecked,
        setIsAuthChecked
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
