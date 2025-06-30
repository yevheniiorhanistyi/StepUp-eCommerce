import { Customer } from '@/types/types';
import { PasswordUpdateData } from '@/types/profile';

const updateUserPassword = (data: PasswordUpdateData) => {
  const user = localStorage.getItem('user');
  const userData: Customer = user ? JSON.parse(user) : null;

  if (userData && userData.confirmPassword !== data.currentPassword) {
    throw new Error('Invalid current password!');
  }

  if (userData) {
    userData.password = data.newPassword;
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

export default updateUserPassword;
