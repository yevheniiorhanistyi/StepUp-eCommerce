import { useEffect, useState } from 'react';
import { ICommonCatalogProps } from '@/types/types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchInput = ({ searchParams, setSearchParams }: ICommonCatalogProps) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDebouncedInputValue(searchParams.term || '');
  }, [searchParams.term]);

  const handleSearchChange = (newValue: string) => {
    setDebouncedInputValue(newValue);
    setIsTyping(true);
  };

  useEffect(() => {
    let delayInputTimeoutId: NodeJS.Timeout;
    if (isTyping) {
      delayInputTimeoutId = setTimeout(() => {
        setSearchParams({ ...searchParams, term: debouncedInputValue });
        setIsTyping(false);
      }, 500);
    }

    return () => clearTimeout(delayInputTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, isTyping]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Search"
        className="pl-10"
        value={debouncedInputValue}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
