'use client';

import { useCategoryData } from '@/context/CategoryContext';
import { buildCategoryTree } from '@/lib/utils';
import { ICategoryMenuProps } from '@/types/types';

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { SidebarGroup, SidebarGroupLabel, SidebarMenuSub } from '../ui/sidebar';
import { Button } from '../ui/button';
import { LANGUAGE_CODE } from '@/constants/constants';

const CategoryMenu = ({ categorySlug, onCategoryClick }: ICategoryMenuProps) => {
  const { categoryData } = useCategoryData();
  const categoryTree = buildCategoryTree(categoryData);

  const categoriesWithChildren = categoryTree.filter((cat) => cat.children.length > 0);
  const categoriesWithoutChildren = categoryTree.filter((cat) => cat.children.length === 0);

  return (
    <Collapsible className="group/collapsible w-full">
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger className="cursor-pointer">
            Categories
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="pl-2 mt-2 space-y-2">
          {/* Categories without subcategories */}
          <SidebarMenuSub>
            {categoriesWithoutChildren.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryClick(category.slug[LANGUAGE_CODE])}
                className="text-left text-sm w-full font-medium hover:underline cursor-pointer pl-2"
              >
                {category.name[LANGUAGE_CODE]}
              </button>
            ))}
            {/* Categories with subcategories */}
            {categoriesWithChildren.map((category) => (
              <Collapsible key={category.id} className="group/cat">
                <div className="flex items-center w-full text-sm font-medium hover:bg-muted px-2 py-1 rounded">
                  <button
                    type="button"
                    onClick={() => onCategoryClick(category.slug[LANGUAGE_CODE])}
                    className="text-left w-1/2 hover:underline cursor-pointer"
                  >
                    {category.name[LANGUAGE_CODE]}
                  </button>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="link"
                      size="icon"
                      className="ml-auto cursor-pointer w-[36px] h-[24px]"
                    >
                      <ChevronRight className="transition-transform group-data-[state=open]/cat:rotate-90" />
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="ml-4 mt-1 space-y-1">
                  <SidebarMenuSub>
                    {category.children.map((child) => (
                      <span
                        key={child.id}
                        role="button"
                        onClick={() => onCategoryClick(child.slug[LANGUAGE_CODE])}
                        className={cn(
                          'flex font-medium text-sm text-primary hover:text-primary hover:underline text-left w-1/2 cursor-pointer',
                          categorySlug === child.slug[LANGUAGE_CODE] && 'font-semibold'
                        )}
                      >
                        {child.name[LANGUAGE_CODE]}
                      </span>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default CategoryMenu;
