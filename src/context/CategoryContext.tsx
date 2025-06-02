'use client';

import { Category } from '@commercetools/platform-sdk';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getAllCategories } from '@/services/getAllCategories';

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
        const data = await getAllCategories();
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
