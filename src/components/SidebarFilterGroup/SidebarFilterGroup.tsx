'use client';

import { ISidebarFilterGroupProps } from '@/types/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from '../ui/sidebar';

const SidebarFilterGroup = ({
  label,
  labelList,
  propertyToChange,
  searchParams,
  setSearchParams
}: ISidebarFilterGroupProps) => {
  const property = propertyToChange;

  const handleChangeValue = (value: string) => {
    const currentValues = searchParams[property] || [];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setSearchParams({
      ...searchParams,
      [property]: updatedValues
    });
  };

  return (
    <Collapsible title={label} className="group/collapsible">
      <SidebarGroup className="py-0">
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger className="cursor-pointer">
            {label}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="pt-2">
          <SidebarMenu>
            {labelList.map((item) => {
              const id = `${property}-${item.value}`;
              const isChecked = searchParams[property]?.includes(item.value);

              return (
                <SidebarMenuItem key={item.value} className="flex items-center space-x-2 pl-2 mb-1">
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={() => handleChangeValue(item.value)}
                    className="cursor-pointer"
                  />
                  <label htmlFor={id} className="text-base font-base leading-none cursor-pointer">
                    {item.label}
                  </label>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default SidebarFilterGroup;
