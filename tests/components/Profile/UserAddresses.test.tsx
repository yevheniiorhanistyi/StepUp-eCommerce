import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAddresses from '@/components/Profile/addresses';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { AddressesSection } from '@/components/Profile/addresses/AddressSection';
import { updateUserAddresses } from '@/services/profile/updateAddress';
import SpinnerFallback from '@/components/SpinnerFallback/SpinnerFallback';

jest.mock('@/components/Profile/addresses/AddressSection', () => ({
  AddressesSection: jest.fn(() => <div>Mocked AddressesSection</div>)
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: { id: 'user1' },
    isAuthenticated: true,
    isAuthChecked: true
  }))
}));

jest.mock('@/services/profile/updateAddress');
jest.mock('sonner');

describe('UserAddresses', () => {
  const refreshUserMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading if user is not loaded', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      refreshUser: refreshUserMock
    });

    render(<SpinnerFallback />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
  });

  it('renders AddressesSection with correct props', () => {
    const userMock = {
      id: 'user1',
      version: 1,
      addresses: [
        { id: 'addr1', streetName: 'Street 1' },
        { id: 'addr2', streetName: 'Street 2' }
      ],
      billingAddressIds: ['addr1'],
      shippingAddressIds: ['addr2'],
      defaultBillingAddressId: 'addr1',
      defaultShippingAddressId: 'addr2'
    };

    (useAuth as jest.Mock).mockReturnValue({
      user: userMock,
      refreshUser: refreshUserMock
    });

    render(<UserAddresses />);

    expect(AddressesSection).toHaveBeenCalledTimes(2);

    expect(AddressesSection).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'billing',
        addresses: [userMock.addresses[0]],
        defaultAddressId: 'addr1',
        onEdit: expect.any(Function),
        onDelete: expect.any(Function),
        onSetDefault: expect.any(Function)
      }),
      expect.anything()
    );

    expect(AddressesSection).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'shipping',
        addresses: [userMock.addresses[1]],
        defaultAddressId: 'addr2',
        onEdit: expect.any(Function),
        onDelete: expect.any(Function),
        onSetDefault: expect.any(Function)
      }),
      expect.anything()
    );
  });

  describe('handler functions', () => {
    const userMock = {
      id: 'user1',
      version: 5,
      addresses: [{ id: 'addr1' }],
      billingAddressIds: ['addr1'],
      shippingAddressIds: ['addr1'],
      defaultBillingAddressId: 'addr1',
      defaultShippingAddressId: 'addr1'
    };

    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        user: userMock,
        refreshUser: refreshUserMock
      });

      (updateUserAddresses as jest.Mock).mockResolvedValue({});
      (toast.success as jest.Mock).mockImplementation(() => {});
    });

    it('handleEdit calls updateUserAddresses, refreshUser and toast', async () => {
      render(<UserAddresses />);
      // Получаем функцию onEdit из первого вызова AddressesSection (billing)
      const onEdit = (AddressesSection as jest.Mock).mock.calls[0][0].onEdit;

      await onEdit('addr1', { streetName: 'New Street' });

      expect(updateUserAddresses).toHaveBeenCalledWith({
        version: userMock.version,
        updatedAddress: { id: 'addr1', changes: { streetName: 'New Street' } }
      });
      expect(refreshUserMock).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Address successfully updated.');
    });

    it('handleDelete calls updateUserAddresses, refreshUser and toast', async () => {
      render(<UserAddresses />);
      const onDelete = (AddressesSection as jest.Mock).mock.calls[0][0].onDelete;

      await onDelete('addr1');

      expect(updateUserAddresses).toHaveBeenCalledWith({
        version: userMock.version,
        addressIdToRemove: 'addr1'
      });
      expect(refreshUserMock).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Address successfully deleted.');
    });

    it('handleSetDefault calls updateUserAddresses, refreshUser and toast for billing', async () => {
      render(<UserAddresses />);
      const onSetDefault = (AddressesSection as jest.Mock).mock.calls[0][0].onSetDefault;

      await onSetDefault('addr1');

      expect(updateUserAddresses).toHaveBeenCalledWith({
        version: userMock.version,
        defaultBillingAddressId: 'addr1'
      });
      expect(refreshUserMock).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Address successfully set default.');
    });

    it('handleSetDefault calls updateUserAddresses, refreshUser and toast for shipping', async () => {
      render(<UserAddresses />);
      const onSetDefaultShipping = (AddressesSection as jest.Mock).mock.calls[1][0].onSetDefault;

      await onSetDefaultShipping('addr1');

      expect(updateUserAddresses).toHaveBeenCalledWith({
        version: userMock.version,
        defaultShippingAddressId: 'addr1'
      });
      expect(refreshUserMock).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Address successfully set default.');
    });
  });
});
