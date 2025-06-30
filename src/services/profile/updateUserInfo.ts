import { USER_API } from '@/constants/constants';
import { UserUpdateData } from '../../types/profile';

async function updatePersonalInfo(data: UserUpdateData) {
  const response = await fetch(USER_API.Update, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update profile');
  }

  return response.json();
}

export default updatePersonalInfo;
