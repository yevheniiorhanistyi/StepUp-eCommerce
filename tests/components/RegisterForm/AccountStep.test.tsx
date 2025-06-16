import { fireEvent, render, screen } from '@testing-library/react';
import AccountStep from '@/components/Register/Form/AccountStep';
import type { RegisterFormFields } from '@/types/register';

const mockValues = {
  email: 'user@example.com',
  password: 'Password1',
  confirmPassword: 'Password1'
} as Partial<RegisterFormFields>;

describe('AccountStep', () => {
  it('render all required fields', () => {
    render(
      <AccountStep
        values={mockValues as RegisterFormFields}
        errors={{}}
        touched={{}}
        handleChange={jest.fn()}
        handleBlur={jest.fn()}
        setFieldValue={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();
  });

  it('fields must have correct type: "email" and "password"', () => {
    render(
      <AccountStep
        values={mockValues as RegisterFormFields}
        errors={{}}
        touched={{}}
        handleChange={jest.fn()}
        handleBlur={jest.fn()}
        setFieldValue={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText(/^confirm password$/i)).toHaveAttribute('type', 'password');
  });

  it('should toggle password fields visibility', () => {
    render(
      <AccountStep
        values={mockValues as RegisterFormFields}
        errors={{}}
        touched={{}}
        handleChange={jest.fn()}
        handleBlur={jest.fn()}
        setFieldValue={jest.fn()}
      />
    );

    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByLabelText(/^password visibility switch$/i));
    expect(passwordInput).toHaveAttribute('type', 'text');

    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByLabelText(/confirm password visibility switch/i));
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });
});
