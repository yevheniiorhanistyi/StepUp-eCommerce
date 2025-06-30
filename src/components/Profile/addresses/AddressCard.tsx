import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Pencil, Trash, Home } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Formik } from 'formik';
import AddressFields from './AddressFields';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateUserAddresses } from '../../../services/profile/updateAddress';

import { AddresFields, AddressFieldsValues, Props } from '../../../types/profile';

import handleErrors from '@/services/register/handleErrors';
import { addressValidationSchema } from '@/validation/profileSchema';

const AddressCard = ({ address, isDefault, onDelete, onSetDefault }: Props) => {
  const { user, refreshUser } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (!address.id) {
    toast.message('No address to change.');

    return;
  }

  const addressId = address.id;
  const initialValues: AddresFields = {
    country: address?.country ?? '',
    city: address?.city ?? '',
    streetName: address?.streetName ?? '',
    postalCode: address?.postalCode ?? '',
    isDefault: false
  };

  const handleEdit = async (values: Partial<AddressFieldsValues>) => {
    if (!user) {
      toast.message('User info is missing.');

      return;
    }

    const changes: Partial<AddressFieldsValues> = { ...values };

    if (values.country !== address.country) changes.country = values.country;
    if (values.city !== address.city) changes.city = values.city;
    if (values.streetName !== address.streetName) changes.streetName = values.streetName;
    if (values.postalCode !== address.postalCode) changes.postalCode = values.postalCode;

    if (Object.keys(changes).length === 0) {
      toast.message('No changes to address fields.');
      setIsDialogOpen(false);

      return;
    }

    try {
      await updateUserAddresses({
        version: user.version,
        updatedAddress: {
          id: addressId,
          changes: changes
        }
      });
      toast.success('Address details updated successfully.');
      setIsDialogOpen(false);
      await refreshUser();
    } catch (error: unknown) {
      toast.error(handleErrors(error).message || 'Failed to update address details.');
    }
  };

  return (
    <Card
      className={`flex gap-4 items-start justify-between p-5 pr-[10px] ${isDefault ? 'order-0' : 'order-1'}`}
    >
      <CardContent className="flex gap-2 items-start px-0 w-full min-h-[65px]">
        <div
          className={`${isDefault ? 'bg-primary text-muted' : 'bg-muted text-primary'} p-3 rounded-md flex self-start`}
        >
          <Home className="h-7 w-7" />
        </div>
        <div className="flex flex-col self-start grow">
          <div className="font-semibold">
            {isDefault ? 'Default Address' : 'Additional Address'}
          </div>
          <div className="text-sm text-muted-foreground">
            {address.streetName} {address.streetNumber}, {address.postalCode} {address.city},{' '}
            {address.country}
          </div>
        </div>
        <div
          className={`flex gap-2 items-start justify-center h-full ${!isDefault ? 'text-muted-foreground' : ''}`}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="cursor-pointer" asChild>
              <Button
                aria-label="Edit Address"
                variant="ghost"
                className="cursor-pointer min-h-[40px]"
              >
                <Pencil className={`w-6 h-6 cursor-pointer`} />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-6 sm:px-[50px] sm:py-[35px]">
              <DialogHeader>
                <DialogTitle className="text-[24px]/[24px]">Adress Information</DialogTitle>
                <DialogDescription>Update address details below.</DialogDescription>
              </DialogHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={addressValidationSchema}
                onSubmit={handleEdit}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                    <AddressFields {...formik} />
                    <Button type="submit" className="w-full cursor-pointer duration-300 mt-1">
                      Save
                    </Button>
                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>

          <Button
            aria-label="Delete Address"
            variant="ghost"
            className="cursor-pointer min-h-[40px]"
            onClick={onDelete}
          >
            <Trash className="w-6 h-6 cursor-pointer" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 text-sm px-0">
        <Switch
          aria-label="Set Default"
          className="cursor-pointer"
          checked={isDefault}
          onCheckedChange={onSetDefault}
          id={`default-${address.id}`}
        />
        <label htmlFor={`default-${address.id}`}>
          {isDefault ? 'Default address' : 'Set as default address'}
        </label>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
