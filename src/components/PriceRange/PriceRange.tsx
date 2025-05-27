import { useState } from 'react';
import { ICommonCatalogProps } from '@/types/types';
import { Slider } from '@/components/ui/slider';

const PriceRange = ({ searchParams, setSearchParams }: ICommonCatalogProps) => {
  const [range, setRange] = useState<[number, number]>(() => {
    const prices = searchParams.prices;

    return [prices?.[0] ?? 0, prices?.[1] ?? 1000];
  });

  const handleSliderChange = (val: number[]) => {
    setRange(val as [number, number]);
  };

  const handleSliderCommit = (val: number[]) => {
    setSearchParams({
      ...searchParams,
      prices: val as [number, number]
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm px-2">
      <div className="flex justify-between text-sm font-medium text-muted-foreground">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
      <Slider
        min={0}
        max={1000}
        step={1}
        value={range}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderCommit}
      />
    </div>
  );
};

export default PriceRange;
