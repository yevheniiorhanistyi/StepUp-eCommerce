import { FormikProps } from 'formik';

type RegisterFormProps = Pick<
  FormikProps<RegisterFormFields>,
  'values' | 'errors' | 'touched' | 'handleChange' | 'handleBlur'
> & { setFieldValue: (field: string, value: unknown) => void };

type PersonalInfoProps = Pick<
  FormikProps<PersonalInfoFieldsValues>,
  'values' | 'errors' | 'touched' | 'handleChange' | 'handleBlur'
> & { setFieldValue: (field: string, value: unknown) => void };

type UserAddress = {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  useSame?: boolean;
  [key: string]: string | boolean | undefined;
};

type RegisterFormFields = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  billingAddress: UserAddress;
  shippingAddress: UserAddress;
};

type CommonFormProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | boolean | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
  withToggle?: boolean;
  show?: boolean;
  onToggle?: () => void;
  withDatePicker?: boolean;
  autoComplete?: string;
  onDatePick?: (value: string) => void;
};

type PersonalInfoFieldsValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
};

export type {
  RegisterFormProps,
  UserAddress,
  RegisterFormFields,
  CommonFormProps,
  PersonalInfoFieldsValues,
  PersonalInfoProps
};
