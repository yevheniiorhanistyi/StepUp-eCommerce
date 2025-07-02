import * as Yup from 'yup';

const LoginSchema = Yup.object({
  email: Yup.string()
    .trim('Email must not contain leading or trailing spaces')
    .email('Enter a valid email (e.g. user@example.com)')
    .matches(/^.+@.+\..+$/, 'Email address must contain a domain name')
    .required('Email is required'),

  password: Yup.string()
    .trim('Password must not contain leading or trailing spaces')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one digit')
    .required('Password is required')
});

export default LoginSchema;
