import { USER_API } from '@/constants/constants';
import { PasswordUpdateData } from '@/types/profile';

async function updateUserPassword(data: PasswordUpdateData) {
  const response = await fetch(USER_API.Password, {
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
