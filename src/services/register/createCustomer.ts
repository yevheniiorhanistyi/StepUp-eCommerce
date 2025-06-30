import { buildCustomerDraft } from '@/lib/utils';
import { createAnonymousClient } from '../commercetools/client/createAnonymousClient';
import { RegisterFormFields } from '@/types/register';

async function createCustomer(formData: RegisterFormFields): Promise<void> {
  const apiRoot = createAnonymousClient();
  const userDraft = buildCustomerDraft(formData);

  await apiRoot.customers().post({ body: userDraft }).execute();
}

export default createCustomer;
