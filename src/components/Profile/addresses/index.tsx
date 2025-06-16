'use client';

import { useAuth } from '@/context/AuthContext';
import { AddressesSection } from './AddressSection';
import { updateUserAddresses } from '../../../services/profile/updateAddress';
import { Address } from '@commercetools/platform-sdk';
import { toast } from 'sonner';

const UserAddresses = (): JSX.Element | null => {
  const { user, refreshUser } = useAuth();

  if (!user) return null;

  const handleEdit = async (addressId: string, changes: Partial<Address>) => {
    await updateUserAddresses({
      version: user.version,
      updatedAddress: { id: addressId, changes }
    });
    refreshUser();
    toast.success('Address successfully updated.');
  };

  const handleDelete = async (addressId: string) => {
    await updateUserAddresses({
      version: user.version,
      addressIdToRemove: addressId
    });
    refreshUser();
    toast.success('Address successfully deleted.');
  };

  const handleSetDefault = async (type: 'billing' | 'shipping', addressId: string) => {
    await updateUserAddresses({
      version: user.version,
      ...(type === 'billing'
        ? { defaultBillingAddressId: addressId }
        : { defaultShippingAddressId: addressId })
    });
    refreshUser();
    toast.success('Address successfully set default.');
  };

  const billingAddresses = user?.addresses.filter((address) =>
    user?.billingAddressIds?.includes(address.id ?? '')
  );
  const shippingAddresses = user?.addresses.filter((address) =>
    user?.shippingAddressIds?.includes(address.id ?? '')
  );

  return (
    <div className="flex min-[975px]:justify-center w-full min-[1180px]:gap-20 gap-8 max-[768px]:gap-4 max-[701px]:flex-col max-[701px]:justify-center max-[701px]:items-center">
      <AddressesSection
        type="billing"
        addresses={billingAddresses || []}
        defaultAddressId={user.defaultBillingAddressId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSetDefault={(id) => handleSetDefault('billing', id)}
      />
      <AddressesSection
        type="shipping"
        addresses={shippingAddresses}
        defaultAddressId={user.defaultShippingAddressId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSetDefault={(id) => handleSetDefault('shipping', id)}
      />
    </div>
  );
};

export default UserAddresses;
