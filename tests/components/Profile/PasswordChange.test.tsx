import { fireEvent, render, screen } from '@testing-library/react';
import PasswordChange from '@/components/Profile/details/PasswordChange';

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

describe('PasswordChange', () => {
  it('renders PasswordChange fields', () => {
    render(<PasswordChange />);
    expect(
      screen.getByText(/Change Password/i, { selector: 'div[data-slot="card-title"]' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter current password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter new password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Repeat new Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Change Password/i })).toBeInTheDocument();
  });

  it('fields must have correct type: "email" and "password"', () => {
    render(<PasswordChange />);
    const currentPasswordInput = screen.getByPlaceholderText(/Enter current password/i);
    const newPasswordInput = screen.getByPlaceholderText(/Enter new password/i);
    const repeatNewPasswordInput = screen.getByPlaceholderText(/Repeat new Password/i);

    expect(currentPasswordInput).toHaveAttribute('type', 'password');
    expect(newPasswordInput).toHaveAttribute('type', 'password');
    expect(repeatNewPasswordInput).toHaveAttribute('type', 'password');
  });

  it('should toggle password fields visibility', () => {
    render(<PasswordChange />);
    const currentPasswordInput = screen.getByPlaceholderText('Enter current password');
    const newPasswordInput = screen.getByPlaceholderText(/Enter new password/i);
    const repeatNewPasswordInput = screen.getByPlaceholderText(/Repeat new Password/i);

    expect(currentPasswordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByLabelText(/currentPassword visibility switch/i));
    expect(currentPasswordInput).toHaveAttribute('type', 'text');

    expect(newPasswordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByLabelText(/newPassword visibility switch/i));
    expect(newPasswordInput).toHaveAttribute('type', 'text');

    expect(repeatNewPasswordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByLabelText(/confirmPassword visibility switch/i));
    expect(repeatNewPasswordInput).toHaveAttribute('type', 'text');
  });
});
