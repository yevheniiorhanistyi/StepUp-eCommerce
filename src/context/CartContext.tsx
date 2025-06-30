'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { toast } from 'sonner';

import { ICartItem } from '@/types/types';

interface ICartContextType {
  cart: ICartItem[];
  cartTotalPrice: number;
  cartTotalQuantity: number;
  addItem: (item: ICartItem) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  updateItemQuantity: (key: string, quantity: number) => void;
}

const CartContext = createContext<ICartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartDataProvider');

  return context;
};

export const CartDataProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartTotalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartTotalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addItem = (item: ICartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.key === item.key);
      if (existingItem) {
        return prevCart.map((i) =>
          i.key === item.key ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevCart, item];
      }
    });

    toast.success('Item added to cart successfully!');
  };

  const removeItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
    toast.success('Item removed from cart successfully!');
  };

  const updateItemQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(key);

      return;
    }

    setCart((prev) => prev.map((item) => (item.key === key ? { ...item, quantity } : item)));
    toast.success('Quantity updated successfully!');
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared successfully!');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotalPrice,
        cartTotalQuantity,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartDataProvider;
