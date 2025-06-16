import { PasswordUpdateData } from '../types';

async function updateUserPassword(data: PasswordUpdateData) {
  const response = await fetch('/api/user/password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }

  return response.json();
}

export default updateUserPassword;
