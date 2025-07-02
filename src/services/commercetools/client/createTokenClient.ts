import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { ENV_KEY } from '@/constants/constants';
import { getEnvVar } from '@/lib/utils';
import {
  httpMiddlewareOptions,
  getExistingTokenFlowOptions
} from '@/services/commercetools/options/options';
import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder
} from '@commercetools/platform-sdk';

const projectKey = getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, ENV_KEY.PROJECT_KEY);

export const createTokenClient = (token: string): ByProjectKeyRequestBuilder => {
  const { authorization, options } = getExistingTokenFlowOptions(token);

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(authorization, options)
    .withHttpMiddleware(httpMiddlewareOptions())
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
