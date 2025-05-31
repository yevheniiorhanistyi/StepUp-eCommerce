'use client';

import Link from 'next/link';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import { useCategoryData } from '@/context/CategoryContext';
import { getCategoryBreadcrumb } from '@/lib/utils';

export const CatalogBreadcrumb = ({ categorySlug }: { categorySlug: string }) => {
  const { categoryData } = useCategoryData();

  if (!categorySlug) return null;
  if (!categoryData || categoryData.length === 0) return null;

  const breadcrumbItems = categorySlug ? getCategoryBreadcrumb(categorySlug, categoryData) : [];

  return (
    <Breadcrumb className="max-w-[400px] pl-3 relative top-8 z-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/catalog">Catalog</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.map((category, index) => (
          <Fragment key={category.id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{category.name['en-US']}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={`/catalog?category=${category.slug['en-US']}`}>
                    {category.name['en-US']}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CatalogBreadcrumb;
