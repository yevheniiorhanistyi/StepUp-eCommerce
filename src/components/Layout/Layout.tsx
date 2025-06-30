'use client';

import { useEffect } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ILayoutProps } from '@/types/types';

import { initializeDemoUser } from '@/lib/utils';

const Layout = ({ children }: ILayoutProps): JSX.Element => {
  useEffect(() => {
    initializeDemoUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Header />
      <main className="flex grow shrink-0 basis-auto mx-auto w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
