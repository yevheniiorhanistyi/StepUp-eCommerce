import { render, screen } from '@testing-library/react';
import AddressFields from '@/components/Profile/addresses/AddressFields';

describe('AddressFields', () => {
  const formikProps = {
    values: {
      country: 'PL',
      city: 'Test City',
      streetName: 'Main',
      postalCode: '12345',
      isDefault: false,
      type: 'billing'
    },
    errors: {},
    touched: {},
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    setFieldValue: jest.fn(),
    withSwitch: true
  };
  it('renders address fields', () => {
    render(<AddressFields {...formikProps} />);
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Use address as default/i)).toBeInTheDocument();
  });
});
