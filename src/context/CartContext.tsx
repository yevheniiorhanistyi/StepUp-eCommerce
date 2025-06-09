'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Cart, LineItemDraft } from '@commercetools/platform-sdk';
import { ICartContextType } from '@/types/types';
import { toast } from 'sonner';

import { fetchCart } from '@/services/cart/fetchCart';
import { addItemToCart } from '@/services/cart/addItemToCart';
import { removeItemFromCart } from '@/services/cart/removeItemFromCart';
import { updateItemQuantity as updateQuantityInCart } from '@/services/cart/updateItemQuantity';

const CartContext = createContext<ICartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartDataProvider.');
  }

  return context;
};

export const CartDataProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null | undefined>(undefined);

  useEffect(() => {
    fetchCart()
      .then(setCart)
      .catch(() => setCart(undefined));
  }, []);

  const addItem = async (item: LineItemDraft) => {
    try {
      const updatedCart = await addItemToCart(item);
      setCart(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to add item to cart!');
      } else {
        toast.error('Unexpected error. Please try again!');
      }
    }
  };

  const removeItem = async (lineItemId: string) => {
    try {
      const updatedCart = await removeItemFromCart(lineItemId);
      setCart(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to remove item from cart!');
      } else {
        toast.error('Unexpected error. Please try again!');
      }
    }
  };

  const updateItemQuantity = async (lineItemId: string, quantity: number) => {
    try {
      const updatedCart = await updateQuantityInCart(lineItemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to update item quantity!');
      } else {
        toast.error('Unexpected error. Please try again!');
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
