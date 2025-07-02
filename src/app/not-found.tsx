'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFound = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full h-screen/2 px-2 py-4 sm:p-6">
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 max-w-3xl">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-900">404</h1>
        <div className="hidden md:block md:border-l border-gray-300 h-24 sm:h-32" />
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
            This page could not be found.
          </h2>
          <p className="text-gray-600">Sorry, we couldn’t find the page you were looking for.</p>
          <Button size="lg" className="w-full max-w-[200px] mx-auto md:mx-0" asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
