import { Customer } from '@commercetools/platform-sdk';
import { createAnonymousClient } from '@/services/commercetools/client/createAnonymousClient';
import { toast } from 'sonner';

import { RegisterFormFields } from './types';
import mapFormData from './FormUserData';
import { handleErrors } from './registerUtils';

const registerUser = async (userData: RegisterFormFields): Promise<Customer | undefined> => {
  const apiRoot = createAnonymousClient();

  const userDraft = {
    ...mapFormData(userData)
  };
  try {
    await apiRoot.customers().post({ body: userDraft }).execute();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userDraft.email,
        password: userDraft.password
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed after registration.');
    }

    return result.customer as Customer;
  } catch (error: unknown) {
    toast.error(handleErrors(error).message);
  }
};
export default registerUser;
