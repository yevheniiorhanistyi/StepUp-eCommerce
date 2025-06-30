import { Customer } from '@commercetools/platform-sdk';
import { toast } from 'sonner';
import { RegisterFormFields } from '../../types/register';
import { getCookieValue } from '@/lib/utils';
import handleErrors from './handleErrors';
import createCustomer from './createCustomer';
import loginCustomer from './loginCustomer';

const registerUser = async (userData: RegisterFormFields): Promise<Customer | undefined> => {
  const anonymousId = getCookieValue('anonymous_id');
  try {
    await createCustomer(userData);

    const customer = await loginCustomer({
      email: userData.email,
      password: userData.password,
      anonymousId
    });

    return customer;
  } catch (error: unknown) {
    toast.error(handleErrors(error).message);

    return undefined;
  }
};
export default registerUser;
