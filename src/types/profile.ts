import { Address } from '@commercetools/platform-sdk';
import { FormikProps } from 'formik';
import { UserAddress } from './register';

export type Props = {
  address: Address;
  isDefault: boolean;
  onDelete: () => void;
  onSetDefault: () => void;
};

export type AddressFieldsValues = {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isDefault: boolean;
  type: 'billing' | 'shipping';
};

export type AddresFields = Omit<AddressFieldsValues, 'type'>;

export type AddressSectionProps = {
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

export type UpdateUserAddressesParams = {
  version: number;
  newAddress?: Address;
  addressIdToRemove?: string;
  updatedAddress?: {
    id: string;
    changes: Partial<Address>;
  };
  shippingAddressIdToAdd?: string;
  billingAddressIdToAdd?: string;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
};

export type UserUpdateData = {
  version: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
};

export type PasswordUpdateData = {
  currentPassword: string;
  newPassword: string;
  version: number;
};
