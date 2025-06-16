'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { ICatalogSidebarProps } from '@/types/types';
import { IterationCw } from 'lucide-react';

import { INITIAL_SEARCH_PARAMS, BRANDS, SIZES, COLORS } from '@/constants/constants';
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/lib/utils';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';

import { Button } from '../ui/button';

import SearchInput from '@/components/SearchInput/SearchInput';
import PriceRange from '../PriceRange/PriceRange';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import SidebarFilterGroup from '@/components/SidebarFilterGroup/SidebarFilterGroup';
import SizeSelectorGroup from '@/components/SizeSelectorGroup/SizeSelectorGroup';
import ColorSelectorGroup from '../ColorSelectorGroup/ColorSelectorGroup';

const CatalogSidebar = ({
  searchParams,
  categorySlug,
  setSearchParams,
  onCategoryClick
}: ICatalogSidebarProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { setOpen, setOpenMobile } = useSidebar();

  const resetFilters = useCallback(() => {
    router.replace('/catalog');
    setSearchParams({ ...INITIAL_SEARCH_PARAMS });
  }, [router, setSearchParams]);

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
      setOpen(false);
    }
  }, [isMobile, setOpen, setOpenMobile]);

  return (
    <Sidebar
      collapsible="offcanvas"
      className={cn('absolute mr-10 border-none', categorySlug ? 'top-19' : 'top-14')}
    >
      <SidebarHeader className="lg:pt-0">
        <SearchInput searchParams={searchParams} setSearchParams={setSearchParams} />
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto h-[600px] max-h-[743px] pb-6">
        <Button
          variant="ghost"
          className="font-normal ml-2 max-w-[100px] capitalize cursor-pointer"
          onClick={resetFilters}
        >
          Reset all
          <IterationCw />
        </Button>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-sidebar-foreground">Price</SidebarGroupLabel>
          <PriceRange searchParams={searchParams} setSearchParams={setSearchParams} />
        </SidebarGroup>
        <CategoryMenu categorySlug={categorySlug} onCategoryClick={onCategoryClick} />
        <SidebarFilterGroup
          label="Brand"
          labelList={BRANDS}
          propertyToChange="brands"
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <ColorSelectorGroup
          label="Color"
          labelList={COLORS}
          propertyToChange="colors"
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <SizeSelectorGroup
          label="Size"
          labelList={SIZES}
          propertyToChange="sizes"
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </SidebarContent>
    </Sidebar>
  );
};

export default CatalogSidebar;
