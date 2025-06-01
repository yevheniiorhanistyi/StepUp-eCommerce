import { Button } from '@/components/ui/button';
import { Address } from '@commercetools/platform-sdk';
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
import { Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserAddress } from '@/components/Register/types';
import AddressFields from './AddressFields';
import { updateUserAddresses } from './updateAddress';
import { toast } from 'sonner';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import * as Yup from 'yup';

countries.registerLocale(enLocale);

type Props = {
  type: 'billing' | 'shipping';
  addresses: Address[];
  defaultAddressId?: string;
  onEdit: (addressId: string, changes: Partial<Address>) => Promise<void>;
  onDelete: (addressId: string) => Promise<void>;
  onSetDefault: (addressId: string) => Promise<void>;
};

export type AddressInfoProps = Pick<
  FormikProps<UserAddress>,
  'values' | 'errors' | 'touched' | 'handleChange' | 'handleBlur'
> & {
  setFieldValue: (field: string, value: unknown) => void;
  withSwitch?: boolean;
};

export type AddressFieldsValues = {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isDefault: boolean;
  type: 'billing' | 'shipping';
};

export function AddressesSection({
  type,
  addresses,
  defaultAddressId,
  onDelete,
  onSetDefault
}: Props) {
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

  const adressValidationSchema = Yup.object({
    country: Yup.string()
      .matches(/^[A-Za-zÀ-ÿ' -]+$/, 'Field must only contain letters')
      .required('Country is required'),
    city: Yup.string()
      .matches(/^[A-Za-zÀ-ÿ' -]+$/, 'Field must only contain letters')
      .required('City is required'),
    streetName: Yup.string()
      .matches(/^[A-Za-zÀ-ÿ0-9\s,'/.-]{2,}$/, 'Field must contain letters & numbers')
      .required('Street is required'),
    postalCode: Yup.string()
      .matches(/^[A-Za-z0-9\s-]{3,10}$/, 'Invalid postal code format')
      .required('Postal code is required')
  });

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
      const countryCode = countries.getAlpha2Code(values.country.trim(), 'en');
      if (!countryCode) {
        throw new Error(`Invalid country name: ${values.country}`);
      }

      const result = await updateUserAddresses({
        version: user.version,
        newAddress: {
          ...userDetails,
          country: countryCode,
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
          <Button type="button" variant="ghost" className="justify-end cursor-pointer duration-300">
            <Plus className="flex self-center h-4 w-4" /> Add a new address
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6 sm:px-[50px] sm:py-[35px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-[24px]/[24px]">{title} Information</DialogTitle>
            <DialogDescription>Update your personal information below.</DialogDescription>
          </DialogHeader>
          <Formik<AddressFieldsValues>
            initialValues={initialValues}
            validationSchema={adressValidationSchema}
            onSubmit={addAddress}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <AddressFields {...formik} withSwitch />
                <Button type="submit" className="w-full cursor-pointer duration-300">
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
