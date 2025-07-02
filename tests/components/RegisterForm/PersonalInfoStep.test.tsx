import { fireEvent, render, screen } from '@testing-library/react';
import PersonalInfoStep from '@/components/Register/Form/PersonalInfoStep';
import type { RegisterFormFields } from '@/types/register';
import React from 'react';

const mockValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  billingAddress: {
    country: '',
    city: '',
    streetName: '',
    postalCode: ''
  },
  shippingAddress: {
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
    useSame: true
  }
} as Partial<RegisterFormFields>;

describe('PersonalInfoStrep', () => {
  it('Render all required fields', () => {
    render(
      <PersonalInfoStep
        values={mockValues as RegisterFormFields}
        errors={{}}
        touched={{}}
        handleChange={jest.fn()}
        handleBlur={jest.fn()}
        setFieldValue={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();

    expect(
      screen.getByRole('switch', { name: /use same address for shipping/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /use same address for shipping/i })).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('Date is picked and set', () => {
    const mockSetFieldValue = jest.fn();
    render(
      <PersonalInfoStep
        values={mockValues as RegisterFormFields}
        errors={{}}
        touched={{}}
        handleChange={jest.fn()}
        handleBlur={jest.fn()}
        setFieldValue={mockSetFieldValue}
      />
    );

    const hiddenInput = screen.getByLabelText(/hidden date input/i) as HTMLInputElement;
    fireEvent.change(hiddenInput, { target: { value: '1990-01-01' } });
    expect(mockSetFieldValue).toHaveBeenCalledWith('dateOfBirth', '1990-01-01');
  });

  it('Use same property change when switch clicked', () => {
    const mockSetFieldValue = jest.fn();
    render(
      <PersonalInfoStep
        values={mockValues as RegisterFormFields}
        errors={{}}
        touched={{}}
        handleChange={jest.fn()}
        handleBlur={jest.fn()}
        setFieldValue={mockSetFieldValue}
      />
    );

    const switchElement = screen.getByRole('switch', { name: /use same address for shipping/i });
    fireEvent.click(switchElement);
    expect(mockSetFieldValue).toHaveBeenCalledWith('shippingAddress.useSame', false);
  });
});
