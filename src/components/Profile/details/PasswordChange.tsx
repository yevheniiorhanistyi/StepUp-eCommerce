import { useState } from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FormField from '@/components/Register/Form/FieldForm';
import { Button } from '@/components/ui/button';
import { passwordSchema } from '@/components/Register/RegisterSchema';
import { handleErrors } from '@/components/Register/registerUtils';
import updateUserPassword from './updatePassword';
import { useAuth } from '@/context/AuthContext';

const validationSchema = Yup.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: Yup.string()
    .transform((value) => value?.trim())
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Password is required')
});

const PasswordChange = (): JSX.Element => {
  const { user, refreshUser } = useAuth();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Card className="flex flex-col justify-center basis-1/2 max-w-[400px] min-w-[270px] py-0 p-5 gap-6 max-[701px]:min-w-[400px] max-[456px]:min-w-full">
      <CardHeader className="px-0 w-full">
        <CardTitle className="min-[975px]:text-[24px]/[24px] text-[20px]/[20px] font-bold">
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              if (!user) return;

              await updateUserPassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                version: user.version
              });

              const authResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: user.email,
                  password: values.newPassword
                }),
                credentials: 'include'
              });

              if (!authResponse.ok) {
                const err = await authResponse.json();
                throw new Error(err.message || 'Failed to reauthenticate');
              }
              await new Promise((resolve) => setTimeout(resolve, 500));
              await refreshUser();
              resetForm();
              toast.success('Password updated successfully!');
            } catch (error: unknown) {
              toast.error(handleErrors(error).message);
            }
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-6" id="change-password">
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={user?.email || ''}
                readOnly
                hidden
              />
              <FormField
                name="currentPassword"
                label=""
                placeholder="Enter current password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.currentPassword}
                touched={touched.currentPassword}
                withToggle
                show={showCurrent}
                onToggle={() => setShowCurrent(!showCurrent)}
              />
              <FormField
                name="newPassword"
                label=""
                placeholder="Enter new password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.newPassword}
                touched={touched.newPassword}
                withToggle
                show={showNew}
                onToggle={() => setShowNew(!showNew)}
              />
              <FormField
                name="confirmPassword"
                label=""
                placeholder="Repeat new password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                withToggle
                show={showConfirm}
                onToggle={() => setShowConfirm(!showConfirm)}
              />
            </Form>
          )}
        </Formik>
      </CardContent>
      <CardFooter className="p-0">
        <Button form="change-password" type="submit" className="w-full cursor-pointer duration-300">
          Change Password
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordChange;
