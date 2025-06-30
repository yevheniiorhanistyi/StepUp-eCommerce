'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as Stepperize from '@stepperize/react';

import { defineStepper } from '@/components/ui/stepper';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ERROR_CODE, ERROR_MESSAGES, REGISTER_INITIAL_VALUES } from '@/constants/constants';

import { useAuth } from '@/context/AuthContext';

import { RegisterFormFields } from '@/types/register';

import { registerStepSchema, registerStep1Schema } from '@/lib/registerSchema';

import AccountStep from './AccountStep';
import PersonalInfoStep from './PersonalInfoStep';

import checkEmailAvailability from '@/services/register/checkEmail';

const RegisterForm = (): JSX.Element => {
  const { setAuthentication, refreshUser } = useAuth();
  const router = useRouter();

  const steps = [
    { id: '0', title: 'Email & password', validation: registerStepSchema },
    { id: '1', title: 'Personal info', validation: registerStep1Schema }
  ];

  const { Stepper } = defineStepper(...steps);

  const handleSubmit = async (
    values: RegisterFormFields,
    { setSubmitting }: FormikHelpers<RegisterFormFields>
  ): Promise<void> => {
    try {
      localStorage.setItem('user', JSON.stringify(values));

      await new Promise((resolve) => setTimeout(resolve, 500));

      await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setAuthentication(true);
      toast.success(`Registration successful!`);
      refreshUser();
      router.push('/');
    } catch {
      toast.error('Failed to register!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStepContinue = async ({
    methods,
    values,
    validateForm,
    setFieldError,
    setFieldTouched,
    submitForm
  }: {
    methods: Stepperize.Stepper<typeof steps>;
    values: RegisterFormFields;
    validateForm: () => Promise<Record<string, unknown>>;
    setFieldError: (field: string, message: string) => void;
    setFieldTouched: (field: string, touched: boolean) => void;
    submitForm: () => void;
  }) => {
    const isValid = await validateForm();
    if (Object.keys(isValid).length === 0) {
      if (methods.isFirst) {
        const isEmailAvailable = checkEmailAvailability(values.email);
        if (!isEmailAvailable) {
          setFieldError('email', ERROR_MESSAGES[ERROR_CODE.EmailAlreadyExists]);
          toast.error('User with this email already exists!');

          return;
        }
        methods.next();
      } else {
        submitForm();
      }
    } else {
      markFieldsTouched(isValid, setFieldTouched);
    }
  };

  return (
    <Card className="flex items-center justify-center p-6 sm:px-[50px] sm:py-[35px] max-w-[512px] w-full shadow-lg rounded-x1 gap-4">
      <CardHeader className="px-0 w-full">
        <CardTitle className="text-3xl font-bold text-center ">Create Your Account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 px-0 w-full">
        <Stepper.Provider>
          {({ methods }) => (
            <Formik
              initialValues={REGISTER_INITIAL_VALUES}
              validationSchema={methods.current.validation}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                setFieldError,
                setFieldTouched,
                validateForm,
                submitForm,
                isValid,
                dirty
              }) => (
                <Form className="flex justify-self-center flex-col gap-7 max-w-[410px] w-full">
                  <Stepper.Navigation className="px-5">
                    {methods.all.map((step) => (
                      <Stepper.Step
                        key={step.id}
                        of={step.id}
                        className="cursor-default"
                      ></Stepper.Step>
                    ))}
                  </Stepper.Navigation>
                  {methods.switch({
                    '0': () => (
                      <AccountStep
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ),
                    '1': () => (
                      <PersonalInfoStep
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    )
                  })}

                  <Stepper.Controls className="flex justify-end">
                    <Button
                      className="flex-1/3 sm:flex-initial sm:min-w-[100px] cursor-pointer"
                      type="button"
                      variant={methods.isFirst ? 'ghost' : 'default'}
                      onClick={() =>
                        methods.afterPrev(async () => {
                          const isValid = await validateForm();
                          if (Object.keys(isValid).length !== 0) {
                            markFieldsTouched(isValid, setFieldTouched);
                          }
                        })
                      }
                      disabled={methods.isFirst}
                    >
                      {methods.isFirst ? '' : 'Previous'}
                    </Button>
                    <Button
                      className="flex-1/3 sm:flex-initial sm:min-w-[100px] cursor-pointer"
                      type="button"
                      disabled={!isValid || !dirty}
                      onClick={() =>
                        handleStepContinue({
                          methods,
                          values,
                          validateForm,
                          setFieldError,
                          setFieldTouched,
                          submitForm
                        })
                      }
                    >
                      {methods.isFirst ? 'Next' : 'Register'}
                    </Button>
                  </Stepper.Controls>
                </Form>
              )}
            </Formik>
          )}
        </Stepper.Provider>
        <LoginButton />
      </CardContent>
    </Card>
  );
};

const LoginButton = (): JSX.Element => {
  return (
    <div className="text-center text-sm">
      <span>Already have an account? </span>
      <Link
        href="/login"
        className="underline underline-offset-4 text-black hover:text-neutral-600 transition-colors font-bold"
      >
        Sign In.
      </Link>
    </div>
  );
};

export function markFieldsTouched(
  errors: Record<string, unknown>,
  setFieldTouched: (field: string, touched: boolean) => void
) {
  Object.entries(errors).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      Object.keys(value).forEach((nested) => {
        setFieldTouched(`${key}.${nested}`, true);
      });
    } else {
      setFieldTouched(key, true);
    }
  });
}

export default RegisterForm;
