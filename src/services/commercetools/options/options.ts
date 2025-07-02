import {
  HttpMiddlewareOptions,
  AuthMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { tokenServiceInstance } from '../token/TokenService';
import { ENV_KEY } from '@/constants/constants';
import { getEnvVar } from '@/lib/utils';

export const httpMiddlewareOptions = (): HttpMiddlewareOptions => {
  return {
    host: getEnvVar(process.env.NEXT_PUBLIC_API_URL, ENV_KEY.API_URL),
    fetch
  };
};

export const getExistingTokenFlowOptions = (token: string) => {
  return {
    authorization: `Bearer ${token}`,
    options: {
      force: true
    }
  };
};

export const getAuthMiddlewareOptions = (): AuthMiddlewareOptions => {
  return {
    host: getEnvVar(process.env.NEXT_PUBLIC_AUTH_URL, ENV_KEY.AUTH_URL),
    projectKey: getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, ENV_KEY.PROJECT_KEY),
    credentials: {
      clientId: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_ID, ENV_KEY.CLIENT_ID),
      clientSecret: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_SECRET, ENV_KEY.CLIENT_SECRET)
    },
    scopes: [getEnvVar(process.env.NEXT_PUBLIC_SCOPES, ENV_KEY.SCOPES)],
    fetch
  };
};

export const getAnonymousMiddlewareOptions = (): AnonymousAuthMiddlewareOptions => {
  return {
    host: getEnvVar(process.env.NEXT_PUBLIC_AUTH_URL, ENV_KEY.AUTH_URL),
    projectKey: getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, ENV_KEY.PROJECT_KEY),
    credentials: {
      clientId: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_ID, ENV_KEY.CLIENT_ID),
      clientSecret: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_SECRET, ENV_KEY.CLIENT_SECRET)
    },
    scopes: [getEnvVar(process.env.NEXT_PUBLIC_SCOPES, ENV_KEY.SCOPES)],
    tokenCache: tokenServiceInstance,
    fetch
  };
};

export const getPasswordAuthMiddlewareOptions = (
  username: string,
  password: string
): PasswordAuthMiddlewareOptions => {
  return {
    host: getEnvVar(process.env.NEXT_PUBLIC_AUTH_URL, ENV_KEY.AUTH_URL),
    projectKey: getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, ENV_KEY.PROJECT_KEY),
    credentials: {
      clientId: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_ID, ENV_KEY.CLIENT_ID),
      clientSecret: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_SECRET, ENV_KEY.CLIENT_SECRET),
      user: {
        username,
        password
      }
    },
    scopes: [getEnvVar(process.env.NEXT_PUBLIC_SCOPES, ENV_KEY.SCOPES)],
    tokenCache: tokenServiceInstance,
    fetch
  };
};

export const getRefreshAuthMiddlewareOptions = (
  refreshToken: string
): RefreshAuthMiddlewareOptions => {
  return {
    host: getEnvVar(process.env.NEXT_PUBLIC_AUTH_URL, ENV_KEY.AUTH_URL),
    projectKey: getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, ENV_KEY.PROJECT_KEY),
    credentials: {
      clientId: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_ID, ENV_KEY.CLIENT_ID),
      clientSecret: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_SECRET, ENV_KEY.CLIENT_SECRET)
    },
    refreshToken,
    tokenCache: tokenServiceInstance,
    fetch
  };
};
