import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchInput from '@/components/SearchInput/SearchInput';
import { ICommonCatalogProps } from '@/types/types';

describe('SearchInput', () => {
  const mockSetSearchParams = jest.fn();

  const baseProps: ICommonCatalogProps = {
    searchParams: {
      term: '',
      colors: [],
      sizes: [],
      brands: [],
      prices: [0, 1000],
      limit: 6,
      offset: 0,
      sort: 'price asc'
    },
    setSearchParams: mockSetSearchParams
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mockSetSearchParams.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('clears timeout on unmount', async () => {
    const { unmount } = render(<SearchInput {...baseProps} />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: 'test' } });

    await Promise.resolve();

    unmount();

    jest.runOnlyPendingTimers();
    await Promise.resolve();

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  it('calls setSearchParams after debounce delay', () => {
    render(<SearchInput {...baseProps} />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: 'debounced' } });

    expect(mockSetSearchParams).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({ term: 'debounced' })
    );
  });
});
