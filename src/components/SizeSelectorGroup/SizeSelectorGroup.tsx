import { ISidebarFilterGroupProps } from '@/types/types';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar';

const SizeSelectorGroup = ({
  label,
  labelList,
  propertyToChange,
  searchParams,
  setSearchParams
}: ISidebarFilterGroupProps) => {
  const property = propertyToChange;

  const toggleSize = (size: string) => {
    const current = searchParams[property] || [];

    const updated = current.includes(size) ? current.filter((s) => s !== size) : [...current, size];

    setSearchParams({
      ...searchParams,
      [property]: updated
    });
  };

  return (
    <Collapsible defaultOpen title={label} className="group/collapsible">
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
        <CollapsibleContent>
          <SidebarMenu>
            <div className="flex flex-wrap gap-2 p-3">
              {labelList.map((item) => {
                const isActive = searchParams[property]?.includes(item.value);

                return (
                  <SidebarMenuItem key={item.value}>
                    <Button
                      variant="outline"
                      onClick={() => toggleSize(item.value)}
                      className={cn(
                        'min-w-[40px] text-sm px-3 py-1 rounded-md transition cursor-pointer',
                        isActive
                          ? 'bg-black text-white border-black hover:bg-black hover:text-white'
                          : 'bg-white text-black border-gray-300 hover:border-black'
                      )}
                    >
                      {item.label}
                    </Button>
                  </SidebarMenuItem>
                );
              })}
            </div>
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default SizeSelectorGroup;
