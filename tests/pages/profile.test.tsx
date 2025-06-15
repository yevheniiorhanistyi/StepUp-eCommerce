import { render, screen } from '@testing-library/react';
import Profile from '@/app/profile/page';
import { useAuth } from '@/context/AuthContext';

jest.mock('@/components/Profile/details/index', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Personal Information</div>)
}));

jest.mock('@/components/Profile/addresses/index', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Addresses</div>)
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    isAuthenticated: true,
    isAuthChecked: true
  }))
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Profile page', () => {
  it('renders Profile when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1 },
      isAuthenticated: true,
      isAuthChecked: true
    });
    render(<Profile />);

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Addresses')).toBeInTheDocument();
  });
});
