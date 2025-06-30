import * as Yup from 'yup';

const today = new Date();
const MIN_AGE = 14;
const minValidDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());

const passwordSchema = Yup.string()
  .transform((value) => value?.trim())
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
  .matches(/\d/, 'Must contain at least one digit')
  .required('Password is required');

const registerStepSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Enter a valid email (user@example.com)')
    .matches(/^.+@.+\..+$/, 'Email address must contain a domain name')
    .required('Email is required'),

  password: passwordSchema,

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required')
});

const registerStep1Schema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-zÀ-ÿ' -]{2,}$/u, 'First name must only contain letters')
    .required('First name is required'),

  lastName: Yup.string()
    .matches(/^[A-Za-zÀ-ÿ' -]{2,}$/u, 'Last name must only contain letters')
    .required('Last name is required'),

  dateOfBirth: Yup.date()
    .max(minValidDate, `You must be at least ${MIN_AGE} years old`)
    .required('Date of birth is required'),

  phoneNumber: Yup.string()
    .matches(
      /^[+]?(\d{1,3})?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,5}$/,
      'Enter a valid phone number'
    )
    .required('Phone number is required'),

  billingAddress: Yup.object({
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
  }),

  shippingAddress: Yup.object({
    country: Yup.string().when('useSame', {
      is: false,
      then: (schema) =>
        schema
          .matches(/^[A-Za-zÀ-ÿ' -]+$/, 'Field must only contain letters')
          .required('Country is required'),
      otherwise: (schema) => schema.notRequired()
    }),

    city: Yup.string().when('useSame', {
      is: false,
      then: (schema) =>
        schema
          .matches(/^[A-Za-zÀ-ÿ' -]+$/, 'Field must only contain letters')
          .required('City is required'),
      otherwise: (schema) => schema.notRequired()
    }),

    streetName: Yup.string().when('useSame', {
      is: false,
      then: (schema) =>
        schema
          .matches(/^[A-Za-zÀ-ÿ0-9\s,'.-]{2,}$/, 'Field must contain letters and numbers')
          .required('Street is required'),
      otherwise: (schema) => schema.notRequired()
    }),

    postalCode: Yup.string().when('useSame', {
      is: false,
      then: (schema) =>
        schema
          .matches(/^[A-Za-z0-9\s-]{3,10}$/, 'Invalid postal code format')
          .required('Postal code is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    useSame: Yup.boolean()
  })
});

export { registerStepSchema, registerStep1Schema, passwordSchema };
