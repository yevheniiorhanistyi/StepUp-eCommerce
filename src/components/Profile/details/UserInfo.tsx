'use client';

import PersonalInfoFields from '@/components/Register/Form/PersonalInfoFields';
import { registerStep0Schema, registerStep1Schema } from '@/components/Register/RegisterSchema';
import { PersonalInfoFieldsValues } from '@/components/Register/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Formik } from 'formik';
import { useState } from 'react';
import updatePersonalInfo from './updateUserInfo';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { handleErrors } from '@/components/Register/registerUtils';

const UserInfo = (): JSX.Element => {
  const { user, refreshUser } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialValues: PersonalInfoFieldsValues = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    dateOfBirth: user?.dateOfBirth ?? '',
    phoneNumber: user?.custom?.fields?.phoneNumber ?? ''
  };

  const validationSchema = Yup.object({
    firstName: registerStep1Schema.fields.firstName,
    lastName: registerStep1Schema.fields.lastName,
    dateOfBirth: registerStep1Schema.fields.dateOfBirth,
    phoneNumber: registerStep1Schema.fields.phoneNumber,
    email: registerStep0Schema.fields.email
  });

  const handleUpdate = async (values: PersonalInfoFieldsValues) => {
    if (!user) {
      toast.error('User version info missing.');

      return;
    }
    const updates: Partial<PersonalInfoFieldsValues> = {};

    if (values.firstName !== user.firstName) updates.firstName = values.firstName;
    if (values.lastName !== user.lastName) updates.lastName = values.lastName;
    if (values.dateOfBirth !== user.dateOfBirth) updates.dateOfBirth = values.dateOfBirth;
    if (values.email !== user.email) updates.email = values.email;
    if (values.phoneNumber !== user.custom?.fields?.phoneNumber)
      updates.phoneNumber = values.phoneNumber;

    if (Object.keys(updates).length === 0) {
      toast.message('No changes to fields.');
      setIsDialogOpen(false);

      return;
    }

    try {
      await updatePersonalInfo({ version: user.version, ...updates });
      toast.success('Profile updated successfully.');
      setIsDialogOpen(false);
      await refreshUser();
    } catch (error: unknown) {
      toast.error(handleErrors(error).message || 'Failed to update profile.');
    }
  };

  return (
    <Card className="flex align-middle justify-center basis-1/2 max-w-[400px] min-w-[270px] py-0 p-5 gap-6">
      <CardHeader className="px-0 w-full">
        <CardTitle className="min-[975px]:text-[24px]/[24px] text-[20px]/[20px] font-bold">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center h-full flex-col px-0 gap-4">
        <div className="flex justify-between text-[16px]">
          <span className="font-semibold">Name:</span> {user?.firstName} {user?.lastName}
        </div>
        <div className="flex justify-between text-[16px]">
          <span className="font-semibold">Email:</span> {user?.email}
        </div>
        <div className="flex justify-between text-[16px]">
          <span className="font-semibold">Date of Birth:</span> {user?.dateOfBirth}
        </div>
        <div className="flex justify-between text-[16px]">
          <span className="font-semibold">Phone:</span> {user?.custom?.fields.phoneNumber}
        </div>
      </CardContent>
      <CardFooter className="px-0">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="w-full cursor-pointer duration-300" asChild>
            <Button className="w-full cursor-pointer duration-300" type="button">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 sm:px-[50px] sm:py-[35px]" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="text-[24px]/[24px]">Personal Information</DialogTitle>
              <DialogDescription>Update your personal information below.</DialogDescription>
            </DialogHeader>
            <Formik<PersonalInfoFieldsValues>
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <PersonalInfoFields {...formik} withEmail />
                  <Button type="submit" className="w-full cursor-pointer duration-300">
                    Save
                  </Button>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default UserInfo;
