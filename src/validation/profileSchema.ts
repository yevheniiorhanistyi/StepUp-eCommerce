import * as Yup from 'yup';
import { passwordSchema } from '../validation/registerSchema';

const today = new Date();
const MIN_AGE = 14;
const minValidDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());
export const userInfoValidationSchema = Yup.object({
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
  email: Yup.string()
    .trim()
    .email('Enter a valid email (user@example.com)')
    .matches(/^.+@.+\..+$/, 'Email address must contain a domain name')
    .required('Email is required')
});

export const passwordValidationSchema = Yup.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: Yup.string()
    .transform((value) => value?.trim())
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Password is required')
});

export const addressValidationSchema = Yup.object({
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
