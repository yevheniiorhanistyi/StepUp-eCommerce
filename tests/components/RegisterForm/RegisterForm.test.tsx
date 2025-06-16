import { render, screen } from '@testing-library/react';
import RegisterForm from '@/components/Register/Form/RegisterForm';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ setAuthentication: jest.fn() })
}));

jest.mock('@/context/CartContext', () => ({
  useCart: () => jest.fn()
}));

jest.mock('@/lib/registerSchema', () => ({
  registerStep0Schema: {
    validate: () => Promise.resolve({})
  }
}));

jest.mock('@/services/register/checkEmail', () => ({
  checkEmailAvailability: jest.fn()
}));

jest.mock('@/services/commercetools/client/createAnonymousClient', () => ({
  createAnonymousClient: jest.fn()
}));

jest.mock('@/components/Register/Form/AccountStep', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div>
      AccountStep
      <div>
        <input aria-label="Email" />
        <input aria-label="Password" />
        <input aria-label="Confirm Password" />
      </div>
    </div>
  ))
}));

jest.mock('@/components/Register/Form/PersonalInfoStep', () => ({
  __esModule: true,
  default: jest.fn(() => <div>PersonalStep</div>)
}));

describe('RegisterForm', () => {
  describe('Default render RegisterForm step0(AccountStep)', () => {
    it('renders registration-form step 0(AccountStep): title, AccountStep and link to login page', () => {
      render(<RegisterForm />);

      expect(screen.getByText('Create Your Account')).toBeInTheDocument();
      expect(screen.getByText('AccountStep')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
      expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      expect(screen.getByText(/sign in/i)).toHaveAttribute('href', '/login');
    });
  });
});
