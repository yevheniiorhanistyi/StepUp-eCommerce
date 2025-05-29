'use client';

import { Category } from '@commercetools/platform-sdk';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const CategoryDataContext = createContext<{ categoryData: Category[] }>({
  categoryData: []
});

export const useCategoryData = () => {
  const context = useContext(CategoryDataContext);
  if (!context) {
    throw new Error('useCategoryData must be used within a CategoryDataProvider');
  }

  return context;
};

export const CategoryDataProvider = ({ children }: { children: ReactNode }) => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch('/api/category');
        if (!res.ok) throw new Error('Failed to fetch category data');

        const data: Category[] = await res.json();
        setCategoryData(data);
      } catch {
        setCategoryData([]);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <CategoryDataContext.Provider value={{ categoryData }}>{children}</CategoryDataContext.Provider>
  );
};
