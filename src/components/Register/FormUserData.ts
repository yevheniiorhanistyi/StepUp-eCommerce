import { Address, CustomerDraft } from '@commercetools/platform-sdk';
import { RegisterFormFields, UserAddress } from './types';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

const mapFormData = (formData: RegisterFormFields): CustomerDraft => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    billingAddress,
    shippingAddress
  } = formData;

  const useSame = shippingAddress.useSame === true;
  const billingIsDefault = billingAddress.isDefault === true;
  const shippingIsDefault = shippingAddress.isDefault === true;

  const mappedBillingAddress = mapAddress(billingAddress, {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phoneNumber
  });
  const mappedShippingAddress = useSame
    ? mappedBillingAddress
    : mapAddress(shippingAddress, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber
      });

  const addresses: Address[] = useSame
    ? [mappedBillingAddress]
    : [mappedBillingAddress, mappedShippingAddress];

  return {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    defaultBillingAddress: billingIsDefault ? 0 : undefined,
    defaultShippingAddress: shippingIsDefault ? (useSame ? 0 : 1) : undefined,
    billingAddresses: [0],
    shippingAddresses: [useSame ? 0 : 1],
    custom: {
      type: {
        typeId: 'type',
        key: 'customer-data'
      },
      fields: {
        phoneNumber: phoneNumber
      }
    }
  };
};

function mapAddress(
  address: UserAddress,
  contact: { firstName: string; lastName: string; email?: string; phone?: string }
): Address {
  const { useSame, isDefault, ...rest } = address;
  void useSame;
  void isDefault;
  const countryCode = countries.getAlpha2Code(address.country, 'en');

  if (!countryCode) {
    throw new Error(`Invalid country name: ${address.country}`);
  }

  return {
    ...rest,
    country: countryCode,
    ...contact
  };
}

export default mapFormData;
