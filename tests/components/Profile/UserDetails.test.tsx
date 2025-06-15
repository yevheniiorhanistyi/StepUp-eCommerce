import { render, screen } from '@testing-library/react';
import UserDetails from '@/components/Profile/details';

jest.mock('@/components/Profile/details/UserIcon', () => ({
  __esModule: true,
  default: jest.fn(() => <div>User Icon</div>)
}));

jest.mock('@/components/Profile/details/UserInfo', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Personal Information</div>)
}));

jest.mock('@/components/Profile/details/PasswordChange', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Change Password</div>)
}));

describe('UserDetails', () => {
  it('renders User Details section', () => {
    render(<UserDetails />);

    expect(screen.getByText('User Icon')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });
});
