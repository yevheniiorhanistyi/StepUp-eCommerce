import { render, screen } from '@testing-library/react';
import OrderBlock from '@/components/Cart/OrderBlock';
import { useCart } from '@/context/CartContext';

jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn()
}));

describe('OrderBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders order summary without discount', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        totalPrice: { centAmount: 12000 },
        shippingInfo: { price: { centAmount: 1000 } },
        lineItems: [{ id: '1' }]
      },
      addPromoCode: jest.fn()
    });

    render(<OrderBlock />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Cart Total:')).toBeInTheDocument();
    expect(screen.getByText('$120.00')).toBeInTheDocument();
    expect(screen.getByText('Shipping:')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('$130.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Have a promo code?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Proceed to Checkout' })).toBeInTheDocument();
    expect(screen.getByText('* Taxes and shipping calculated at checkout')).toBeInTheDocument();
  });
});
