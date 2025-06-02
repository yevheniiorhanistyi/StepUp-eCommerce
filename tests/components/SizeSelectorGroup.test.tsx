import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ISearchParamsArrayTypes } from '@/types/types';
import { INITIAL_SEARCH_PARAMS } from '@/constants/constants';
import SizeSelectorGroup from '@/components/SizeSelectorGroup/SizeSelectorGroup';

describe('SizeSelectorGroup', () => {
  const propertyToChange = 'sizes' as keyof ISearchParamsArrayTypes;

  const labelList = [
    { label: '33', value: '33' },
    { label: '34', value: '34' },
    { label: '35', value: '35' }
  ];

  const baseProps = {
    label: 'Size',
    labelList,
    propertyToChange,
    searchParams: INITIAL_SEARCH_PARAMS,
    setSearchParams: jest.fn()
  };

  it('renders all size options', () => {
    render(<SizeSelectorGroup {...baseProps} />);

    labelList.forEach(({ label }) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
  });

  it('calls setSearchParams with updated size when an inactive size is clicked', async () => {
    const user = userEvent.setup();
    const setSearchParams = jest.fn();

    render(
      <SizeSelectorGroup
        {...baseProps}
        searchParams={{ ...INITIAL_SEARCH_PARAMS, sizes: ['34'] }}
        setSearchParams={setSearchParams}
      />
    );

    const size33Button = screen.getByRole('button', { name: '33' });
    await user.click(size33Button);

    expect(setSearchParams).toHaveBeenCalledWith({
      ...INITIAL_SEARCH_PARAMS,
      sizes: ['34', '33']
    });
  });

  it('calls setSearchParams with removed size when an active size is clicked', async () => {
    const user = userEvent.setup();
    const setSearchParams = jest.fn();

    render(
      <SizeSelectorGroup
        {...baseProps}
        searchParams={{ ...INITIAL_SEARCH_PARAMS, sizes: ['34', '35'] }}
        setSearchParams={setSearchParams}
      />
    );

    const size35Button = screen.getByRole('button', { name: '35' });
    await user.click(size35Button);

    expect(setSearchParams).toHaveBeenCalledWith({
      ...INITIAL_SEARCH_PARAMS,
      sizes: ['34']
    });
  });

  it('collapsible group is open by default', () => {
    render(<SizeSelectorGroup {...baseProps} />);

    expect(screen.getByText('33')).toBeVisible();
  });
});
