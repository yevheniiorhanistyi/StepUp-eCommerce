import { UserUpdateData } from '../../types/profile';

function updatePersonalInfo(data: UserUpdateData): Promise<UserUpdateData> {
  return new Promise((resolve, reject) => {
    try {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        throw new Error('User not found!');
      }

      const user = JSON.parse(storedUser);

      const updatedUser = {
        ...user,
        ...data,
        version: (user.version || 0) + 1
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      resolve(updatedUser);
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Failed to update profile'));
    }
  });
}

export default updatePersonalInfo;
