'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ICommonCatalogProps } from '@/types/types';
import { SORTING_OPTIONS } from '@/constants';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const SortingSelect = ({ searchParams, setSearchParams }: ICommonCatalogProps) => {
  const [open, setOpen] = useState(false);
  const selected = SORTING_OPTIONS.find((option) => option.value === searchParams.sort);

  const handleSelect = (value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      sort: value
    }));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer group">
          Sort by:
          <span className="text-muted-foreground ml-1">{selected?.label ?? 'Default'}</span>
          <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORTING_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            key={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortingSelect;
