import { ISidebarFilterGroupProps } from '@/types/types';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

const ColorSelectorGroup = ({
  label,
  labelList,
  propertyToChange,
  searchParams,
  setSearchParams
}: ISidebarFilterGroupProps) => {
  const property = propertyToChange;

  const toggleColor = (color: string) => {
    const current = searchParams[property] || [];
    const updated = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];

    setSearchParams({
      ...searchParams,
      [property]: updated
    });
  };

  return (
    <Collapsible defaultOpen title={label} className="group/collapsible">
      <SidebarGroup>
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
          <div className="flex flex-wrap gap-3 p-3">
            {labelList.map((item) => {
              const isActive = (searchParams[property] || []).includes(item.label);

              return (
                <div key={item.value} className="flex flex-col items-center gap-1 w-12">
                  <button
                    type="button"
                    onClick={() => toggleColor(item.label)}
                    className={cn(
                      'w-9 h-9 rounded-full transition-all duration-200 border',
                      'flex items-center justify-center cursor-pointer',
                      isActive
                        ? 'ring-2 ring-offset-1 ring-black'
                        : 'border-zinc-300 hover:border-black'
                    )}
                    style={{ backgroundColor: item.value.toLowerCase() }}
                    title={item.label}
                    aria-pressed={isActive}
                  />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default ColorSelectorGroup;
