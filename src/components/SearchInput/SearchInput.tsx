import { useEffect, useState, useRef } from 'react';
import { ICommonCatalogProps } from '@/types/types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchInput = ({ searchParams, setSearchParams }: ICommonCatalogProps) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
  }, [debouncedInputValue, isTyping, searchParams, setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.blur();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder="Search"
        className="pl-10"
        value={debouncedInputValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        autoFocus={false}
      />
    </div>
  );
};

export default SearchInput;
