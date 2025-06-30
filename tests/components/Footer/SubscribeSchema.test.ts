import subscribeSchema from '@/validation/subscribeSchema';
import * as Yup from 'yup';

describe('subscribeSchema', () => {
  it('should be valid for a correct email', async () => {
    const validEmail = 'user@example.com';

    await expect(subscribeSchema.isValid({ email: validEmail })).resolves.toBe(true);
  });

  it('should be invalid for an incorrect email without domain', async () => {
    const invalidEmail = 'user@';

    await expect(subscribeSchema.isValid({ email: invalidEmail })).resolves.toBe(false);
  });

  it('should be invalid for an email without @ symbol', async () => {
    const invalidEmail = 'userexample.com';

    await expect(subscribeSchema.isValid({ email: invalidEmail })).resolves.toBe(false);
  });

  it('should be invalid if email is empty', async () => {
    const emptyEmail = '';

    await expect(subscribeSchema.isValid({ email: emptyEmail })).resolves.toBe(false);
  });

  it('should return error messages when invalid email is submitted', async () => {
    const invalidEmail = 'user@';

    try {
      await subscribeSchema.validate({ email: invalidEmail });
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        expect(error.errors[0]).toBe('Email address must contain a domain name');
      }
    }
  });

  it('should return required error if email is not provided', async () => {
    const emptyEmail = '';

    try {
      await subscribeSchema.validate({ email: emptyEmail });
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        expect(error.errors[0]).toBe('Email is required');
      }
    }
  });
});
