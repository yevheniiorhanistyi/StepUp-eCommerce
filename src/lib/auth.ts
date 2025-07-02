import { ICustomerSignInResult } from '@/types/types';

const projectKey = process.env.NEXT_PUBLIC_PROJECT_KEY;
const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const scopes = process.env.NEXT_PUBLIC_SCOPES ?? '';

const getBasicAuthHeader = (): string =>
  'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const loginUser = async (email: string, password: string): Promise<ICustomerSignInResult> => {
  const response = await fetch(`${authUrl}/oauth/${projectKey}/customers/token`, {
    method: 'POST',
    headers: {
      Authorization: getBasicAuthHeader(),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password,
      scope: scopes
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error_description ?? 'Unknown error') as Error & { code?: string };
    error.code = data.error;
    throw error;
  }

  return data;
};

export default loginUser;
