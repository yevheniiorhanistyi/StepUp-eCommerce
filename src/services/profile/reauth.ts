import { AUTH_API } from '@/constants/constants';

const reauthenticate = async (email: string, password: string) => {
  await fetch(AUTH_API.Logout, { method: 'DELETE' });

  const loginResponse = await fetch(AUTH_API.Login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!loginResponse.ok) {
    const err = await loginResponse.json();
    throw new Error(err.message || 'Failed to reauthenticate');
  }
};

export default reauthenticate;
