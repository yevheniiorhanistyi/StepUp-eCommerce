import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { UpdateUserAddressesParams } from '../../types/profile';

export async function updateUserAddresses(params: UpdateUserAddressesParams) {
  const {
    version,
    newAddress,
    addressIdToRemove,
    updatedAddress,
    shippingAddressIdToAdd,
    billingAddressIdToAdd,
    defaultShippingAddressId,
    defaultBillingAddressId
  } = params;

  const addressActions: MyCustomerUpdateAction[] = [];

  if (newAddress) {
    addressActions.push({ action: 'addAddress', address: newAddress });
  }

  if (billingAddressIdToAdd) {
    addressActions.push({
      action: 'addBillingAddressId',
      addressId: billingAddressIdToAdd
    });
  }

  if (shippingAddressIdToAdd) {
    addressActions.push({
      action: 'addShippingAddressId',
      addressId: shippingAddressIdToAdd
    });
  }

  if (addressIdToRemove) {
    addressActions.push({ action: 'removeAddress', addressId: addressIdToRemove });
  }

  if (updatedAddress) {
    const { id, changes } = updatedAddress;
    const addressChanges = { country: '', ...changes };

    addressActions.push({
      action: 'changeAddress',
      addressId: id,
      address: addressChanges
    });
  }

  if (defaultShippingAddressId) {
    addressActions.push({
      action: 'setDefaultShippingAddress',
      addressId: defaultShippingAddressId
    });
  }

  if (defaultBillingAddressId) {
    addressActions.push({
      action: 'setDefaultBillingAddress',
      addressId: defaultBillingAddressId
    });
  }

  if (addressActions.length === 0) {
    throw new Error('No update fields provided');
  }

  const response = await fetch('/api/user/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ version, actions: addressActions })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update user addresses');
  }

  return data;
}
