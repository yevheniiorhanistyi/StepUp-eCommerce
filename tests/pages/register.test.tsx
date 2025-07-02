import { render, screen } from '@testing-library/react';
import Register from '@/app/register/page';

jest.mock('@/components/Register/Form/RegisterForm', () => ({
  __esModule: true,
  default: jest.fn(() => <div>RegisterForm</div>)
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn()
  })
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false
  })
}));

describe('Register', () => {
  it('should render all components', () => {
    render(<Register />);

    expect(screen.getByText('RegisterForm')).toBeInTheDocument();
  });
});
