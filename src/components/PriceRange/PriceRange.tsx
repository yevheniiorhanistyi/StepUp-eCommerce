import { useState, useEffect } from 'react';
import { ICommonCatalogProps } from '@/types/types';
import { Slider } from '@/components/ui/slider';

const MIN_PRICE_RANGE = 0;
const MAX_PRICE_RANGE = 1000;

const STEP = 1;

const PriceRange = ({ searchParams, setSearchParams }: ICommonCatalogProps) => {
  const [range, setRange] = useState<[number, number]>(() => {
    const prices = searchParams.prices;

    return [prices?.[0] ?? MIN_PRICE_RANGE, prices?.[1] ?? MAX_PRICE_RANGE];
  });

  useEffect(() => {
    const prices = searchParams.prices;
    setRange([prices?.[0] ?? MIN_PRICE_RANGE, prices?.[1] ?? MAX_PRICE_RANGE]);
  }, [searchParams.prices]);

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
        min={MIN_PRICE_RANGE}
        max={MAX_PRICE_RANGE}
        step={STEP}
        value={range}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderCommit}
      />
    </div>
  );
};

export default PriceRange;
