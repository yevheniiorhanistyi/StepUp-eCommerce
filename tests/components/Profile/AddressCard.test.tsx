import AddressCard from '@/components/Profile/addresses/AddressCard';
import { Address } from '@commercetools/platform-sdk';
import { render, screen } from '@testing-library/react';

jest.mock('@/services/commercetools/client/createAnonymousClient', () => ({
  createAnonymousClient: jest.fn(() => ({}))
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: { id: 'user1' },
    isAuthenticated: true,
    isAuthChecked: true
  }))
}));

describe('AddressCard', () => {
  it('renders address card', () => {
    const address: Address = {
      id: 'address-1',
      country: 'PL',
      city: 'Main',
      streetName: 'Test 125',
      postalCode: '12345'
    };
    render(
      <AddressCard
        address={address}
        isDefault={true}
        onDelete={jest.fn()}
        onSetDefault={jest.fn()}
      />
    );

    expect(screen.getByText('Test 125 , 12345 Main, PL', { exact: true })).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', () => {
    const address: Address = {
      id: 'address-1',
      country: 'PL',
      city: 'Main',
      streetName: 'Test 125',
      postalCode: '12345'
    } as Address;
    const onDelete = jest.fn();
    render(
      <AddressCard
        address={address}
        isDefault={true}
        onDelete={onDelete}
        onSetDefault={jest.fn()}
      />
    );

    const deleteBtn = screen.getByRole('button', { name: /delete address/i });
    deleteBtn.click();
    expect(onDelete).toHaveBeenCalled();
  });

  it('calls onSetDefault when switch toggled', () => {
    const address: Address = {
      id: 'address-1',
      country: 'PL',
      city: 'Main',
      streetName: 'Test 125',
      postalCode: '12345'
    } as Address;
    const onSetDefault = jest.fn();
    render(
      <AddressCard
        address={address}
        isDefault={false}
        onDelete={jest.fn()}
        onSetDefault={onSetDefault}
      />
    );

    const switchInput = screen.getByLabelText(/set as default address/i);
    switchInput.click();
    expect(onSetDefault).toHaveBeenCalled();
  });
});
