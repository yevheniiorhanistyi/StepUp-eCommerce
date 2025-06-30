import { AUTH_API } from '@/constants/constants';
import { ICredentials } from '@/types/types';
import { Customer } from '@commercetools/platform-sdk';

async function loginCustomer({ email, password, anonymousId }: ICredentials): Promise<Customer> {
  const response = await fetch(AUTH_API.Login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, anonymousId })
  });

  const result: { customer: Customer; error?: string } = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Login failed after registration.');
  }

  return result.customer;
}

export default loginCustomer;
