import UserInfo from '@/components/Profile/details/UserInfo';
import { useAuth } from '@/context/AuthContext';
import updatePersonalInfo from '@/services/profile/updateUserInfo';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as sonner from 'sonner';

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: { id: 'user1' },
    isAuthenticated: true,
    isAuthChecked: true
  }))
}));

jest.mock('@/services/commercetools/client/createAnonymousClient', () => ({
  createAnonymousClient: jest.fn(() => ({}))
}));

jest.mock('@/services/profile/updateUserInfo', () => jest.fn(() => Promise.resolve()));

jest.mock('sonner', () => ({
  toast: { error: jest.fn(), success: jest.fn(), message: jest.fn() }
}));

describe('UserInfo', () => {
  it('renders UserInfo fields', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isAuthChecked: true
    });
    render(<UserInfo />);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edit Profile/i })).toBeInTheDocument();
  });

  describe('handleUpdate', () => {
    it('calls updatePersonalInfo and shows success if changed', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          dateOfBirth: '2000-01-01',
          custom: { fields: { phoneNumber: '123' } },
          version: 1
        }
      });
      (updatePersonalInfo as jest.Mock).mockResolvedValueOnce({});
      render(<UserInfo />);

      fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));

      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
      fireEvent.click(screen.getByRole('button', { name: /Save/i }));

      await waitFor(() => {
        expect(updatePersonalInfo).toHaveBeenCalledWith({
          version: 1,
          firstName: 'Jane'
        });
      });

      await waitFor(() => {
        expect(sonner.toast.success).toHaveBeenCalledWith('Profile updated successfully.');
      });
    });
  });
});
