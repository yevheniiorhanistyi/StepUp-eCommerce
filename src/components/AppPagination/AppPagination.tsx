'use client';

import { IAppPaginationProps } from '@/types/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

const AppPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange
}: IAppPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageLinks = () => {
    const pages: (number | 'dots')[] = [];
    const visibleRange = 1;

    for (let i = 0; i < totalPages; i++) {
      if (i === 0 || i === totalPages - 1 || Math.abs(i - currentPage) <= visibleRange) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'dots') {
        pages.push('dots');
      }
    }

    return pages.map((page, idx) =>
      page === 'dots' ? (
        <PaginationItem key={`dots-${idx}`}>
          <span className="px-2 text-muted-foreground">...</span>
        </PaginationItem>
      ) : (
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={
              page === currentPage
                ? undefined
                : (e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }
            }
            className="rounded-full"
          >
            {page + 1}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 0) onPageChange(currentPage - 1);
            }}
            className={currentPage === 0 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
            }}
            className={currentPage === totalPages - 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
