import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddressCard from './AddressCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Formik } from 'formik';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

import AddressFields from './AddressFields';
import { updateUserAddresses } from '../../../services/profile/updateAddress';
import { toast } from 'sonner';

import { AddressFieldsValues, AddressSectionProps } from '../../../types/profile';
import { addressValidationSchema } from '@/validation/profileSchema';

export function AddressesSection({
  type,
  addresses,
  defaultAddressId,
  onDelete,
  onSetDefault
}: AddressSectionProps) {
  const { user, refreshUser } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const title = type === 'billing' ? 'Billing Addresses' : 'Shipping Addresses';

  const initialValues: AddressFieldsValues = {
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
    isDefault: false,
    type
  };

  const addAddress = async (values: AddressFieldsValues) => {
    if (!user) {
      toast.error('User info is missing.');

      return;
    }

    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user?.custom?.fields?.phoneNumber
    };

    try {
      const result = await updateUserAddresses({
        version: user.version,
        newAddress: {
          ...userDetails,
          country: values.country,
          city: values.city.trim(),
          streetName: values.streetName.trim(),
          postalCode: values.postalCode.trim()
        }
      });

      const addresses = result.user.addresses;
      if (!Array.isArray(addresses) || addresses.length === 0) {
        throw new Error('No addresses returned after update.');
      }

      const newAddress = addresses[addresses.length - 1];

      await updateUserAddresses({
        version: result.user.version,
        ...(type === 'billing' && { billingAddressIdToAdd: newAddress.id }),
        ...(type === 'shipping' && { shippingAddressIdToAdd: newAddress.id }),
        ...(values.isDefault &&
          (type === 'billing'
            ? { defaultBillingAddressId: newAddress.id }
            : { defaultShippingAddressId: newAddress.id }))
      });

      refreshUser();
      toast.success('A new address successfully added.');
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add new address.');
      console.error('Failed to add address:', error);
    }
  };

  return (
    <div className="flex max-w-[500px] flex-col basis-1/2 max-[701px]:min-w-[400px] max-[456px]:min-w-full">
      <h2 className="min-[975px]:text-[24px]/[24px] text-[20px]/[20px] font-bold mb-[20px] pl-5">
        {title}
      </h2>
      <div className="flex flex-col gap-5">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isDefault={defaultAddressId === address.id}
            onDelete={() => address.id && onDelete(address.id)}
            onSetDefault={() => address.id && onSetDefault(address.id)}
          />
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="w-full cursor-pointer duration-300" asChild>
          <Button
            aria-label="add new address"
            type="button"
            variant="ghost"
            className="justify-end cursor-pointer duration-300"
          >
            <Plus className="flex self-center h-4 w-4" /> Add a new address
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6 sm:px-[50px] sm:py-[35px]">
          <DialogHeader>
            <DialogTitle className="text-[24px]/[24px]">{title} Information</DialogTitle>
            <DialogDescription>Update your personal information below.</DialogDescription>
          </DialogHeader>
          <Formik<AddressFieldsValues>
            initialValues={initialValues}
            validationSchema={addressValidationSchema}
            onSubmit={addAddress}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <AddressFields {...formik} withSwitch />
                <Button
                  aria-label="add new address"
                  type="submit"
                  className="w-full cursor-pointer duration-300"
                >
                  Add a new address
                </Button>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
