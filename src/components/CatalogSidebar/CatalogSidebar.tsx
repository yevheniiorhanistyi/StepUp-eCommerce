'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { ICommonCatalogProps } from '@/types/types';
import { IterationCw } from 'lucide-react';

import { INITIAL_SEARCH_PARAMS, GENDER, BRANDS, SIZES, COLORS } from '@/constants/constants';
import { useIsMobile } from '@/hooks/useMobile';

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
import SidebarFilterGroup from '@/components/SidebarFilterGroup/SidebarFilterGroup';
import SizeSelectorGroup from '@/components/SizeSelectorGroup/SizeSelectorGroup';
import ColorSelectorGroup from '../ColorSelectorGroup/ColorSelectorGroup';

const CatalogSidebar = ({ searchParams, setSearchParams }: ICommonCatalogProps) => {
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
    <Sidebar collapsible="offcanvas" className="absolute mr-10 border-none md:top-14">
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
        <SidebarFilterGroup
          label="Gender"
          labelList={GENDER}
          propertyToChange="gender"
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
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
