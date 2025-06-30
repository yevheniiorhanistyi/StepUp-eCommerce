import * as Yup from 'yup';

const subscribeSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required('Email is required')
    .matches(/^.+@.+\..+$/, 'Email address must contain a domain name')
    .email('Enter a valid email (user@example.com)')
});

export default subscribeSchema;
