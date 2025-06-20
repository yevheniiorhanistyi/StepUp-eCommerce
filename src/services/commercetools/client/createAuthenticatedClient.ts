import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { ENV_KEY } from '@/constants/constants';
import { getEnvVar } from '@/lib/utils';
import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder
} from '@commercetools/platform-sdk';
import {
  httpMiddlewareOptions,
  getPasswordAuthMiddlewareOptions
} from '@/services/commercetools/options/options';

const projectKey = getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, ENV_KEY.PROJECT_KEY);

export const createAuthenticatedClient = (
  username: string,
  password: string
): ByProjectKeyRequestBuilder => {
  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(getPasswordAuthMiddlewareOptions(username, password))
    .withHttpMiddleware(httpMiddlewareOptions())
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
