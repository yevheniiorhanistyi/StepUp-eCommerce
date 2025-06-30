'use client';

import { useState } from 'react';

import { ISearchParams } from '@/types/types';
import { cn } from '@/lib/utils';
import { INITIAL_SEARCH_PARAMS, ITEMS_PER_PAGE } from '@/constants/constants';

import { useProductData } from '@/hooks/useProductData';

import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

import ProductList from '@/components/ProductList/ProductList';
import CatalogSidebar from '@/components/CatalogSidebar/CatalogSidebar';
import SortingSelect from '@/components/SortingSelect/SortingSelect';
import AppPagination from '@/components/AppPagination/AppPagination';

const CatalogClient = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParamsState, setSearchParamsState] = useState<ISearchParams>(INITIAL_SEARCH_PARAMS);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParamsState((prev) => ({
      ...prev,
      offset: page * ITEMS_PER_PAGE
    }));
  };

  const { productList, totalElements, isLoading } = useProductData(
    searchParamsState,
    setSearchParamsState,
    setCurrentPage
  );

  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto relative overflow-hidden">
        <SidebarProvider>
          <CatalogSidebar searchParams={searchParamsState} setSearchParams={setSearchParamsState} />
          <SidebarInset className="pl-2">
            <div className="flex flex-col w-full gap-5">
              <div className="flex flex-col items-end pt-10 md:pt-0 lg:flex-row lg:items-center justify-end gap-4">
                <SidebarTrigger />
                <SortingSelect
                  searchParams={searchParamsState}
                  setSearchParams={setSearchParamsState}
                />
              </div>
              <div
                className={cn(
                  'flex flex-col items-center w-full min-h-[742px] mb-10',
                  productList.length === 0 && !isLoading && 'justify-center'
                )}
              >
                {productList.length === 0 && !isLoading ? (
                  <h6 className="text-lg font-semibold">
                    Nothing found. Please try adjusting your filters.
                  </h6>
                ) : (
                  <ProductList products={productList} isLoading={isLoading} />
                )}
                {!isLoading && productList.length > 0 ? (
                  <AppPagination
                    totalItems={totalElements}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                ) : null}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default CatalogClient;
