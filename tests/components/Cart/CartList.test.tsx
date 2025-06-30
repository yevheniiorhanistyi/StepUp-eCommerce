jest.mock('@/context/CartContext', () => ({
  __esModule: true,
  useCart: jest.fn()
}));

import { render, screen } from '@testing-library/react';
import CartList from '@/components/Cart/CartList';
import { useCart } from '@/context/CartContext';
import { LANGUAGE_CODE, ROUTES } from '@/constants/constants';

describe('CartList', () => {
  it('renders empty CartList', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        id: 'cart123',
        version: 1,
        lineItems: []
      },
      clearCart: jest.fn(),
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      addItem: jest.fn(),
      addPromoCode: jest.fn(),
      refreshCart: jest.fn()
    });
    render(<CartList />);
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear Cart' })).toBeInTheDocument();
    expect(screen.getByText(/Your shopping cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to Catalog.' })).toHaveAttribute(
      'href',
      ROUTES.Catalog
    );
  });

  it('renders cart items if present', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        id: 'cart123',
        version: 1,
        lineItems: [
          {
            id: 'item1',
            name: { [LANGUAGE_CODE]: 'Test Product' },
            quantity: 2,
            price: { value: { centAmount: 1000 }, discounted: null },
            variant: { id: 1 }
          }
        ]
      },
      clearCart: jest.fn(),
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      addItem: jest.fn(),
      addPromoCode: jest.fn(),
      refreshCart: jest.fn()
    });
    render(<CartList />);
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });
});
