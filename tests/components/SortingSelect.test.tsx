import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { INITIAL_SEARCH_PARAMS, SORTING_OPTIONS } from '@/constants/constants';
import SortingSelect from '@/components/SortingSelect/SortingSelect';

const mockSetSearchParams = jest.fn();

describe('SortingSelect', () => {
  it('renders the selected sort option correctly', () => {
    render(
      <SortingSelect searchParams={INITIAL_SEARCH_PARAMS} setSearchParams={mockSetSearchParams} />
    );

    const button = screen.getByRole('button', { name: /sort by/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Price: Low - High')).toBeInTheDocument();
  });

  it('opens dropdown and selects a new sort option', async () => {
    render(
      <SortingSelect searchParams={INITIAL_SEARCH_PARAMS} setSearchParams={mockSetSearchParams} />
    );

    const button = screen.getByRole('button', { name: /sort by/i });
    const user = userEvent.setup();
    await user.click(button);

    const newOption = SORTING_OPTIONS.find((opt) => opt.value !== INITIAL_SEARCH_PARAMS.sort);
    if (!newOption) return;

    const option = await screen.findByText((_, el) => el?.textContent?.trim() === newOption.label);

    await user.click(option);

    const passedFn = mockSetSearchParams.mock.calls[0][0];
    expect(typeof passedFn).toBe('function');

    const result = passedFn(INITIAL_SEARCH_PARAMS);
    expect(result).toEqual(expect.objectContaining({ sort: newOption.value }));
  });
});
