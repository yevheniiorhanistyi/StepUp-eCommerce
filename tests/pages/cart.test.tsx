import { render, screen } from '@testing-library/react';
import Cart from '@/app/cart/page';
import { useCart } from '@/context/CartContext';
import SpinnerFallback from '@/components/SpinnerFallback/SpinnerFallback';

jest.mock('@/components/Cart/CartList', () => ({
  __esModule: true,
  default: jest.fn(() => <div>CartList</div>)
}));

jest.mock('@/components/Cart/OrderBlock', () => ({
  __esModule: true,
  default: jest.fn(() => <div>OrderBlock</div>)
}));

jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn()
}));

describe('Cart page', () => {
  it('renders spinner if useCart returns undefined', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: undefined
    });
    render(<SpinnerFallback />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
  });

  it('renders Cart', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: null
    });
    render(<Cart />);
    expect(screen.getByText('CartList')).toBeInTheDocument();
    expect(screen.getByText('OrderBlock')).toBeInTheDocument();
  });
});
