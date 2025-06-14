'use client';
import CartList from '@/components/Cart/CartList';
import OrderBlock from '@/components/Cart/OrderBlock';
import SpinnerFallback from '@/components/SpinnerFallback/SpinnerFallback';
import { useCart } from '@/context/CartContext';

const Cart = (): JSX.Element => {
  const { cart } = useCart();
  if (!cart) {
    return <SpinnerFallback />;
  }

  return (
    <div className="flex justify-between min-[767.97px]:flex-row flex-col px-5 sm:px-10 py-10 gap-5 w-full max-w-[1520px] mx-auto relative">
      <CartList />
      <OrderBlock />
    </div>
  );
};

export default Cart;
