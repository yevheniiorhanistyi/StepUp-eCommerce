type UserUpdateData = {
  version: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
};

async function updatePersonalInfo(data: UserUpdateData) {
  const response = await fetch('/api/user/update', {
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
