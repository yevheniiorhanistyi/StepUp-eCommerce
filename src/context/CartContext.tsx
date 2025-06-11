'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Cart, LineItemDraft } from '@commercetools/platform-sdk';
import { ICartContextType } from '@/types/types';
import { toast } from 'sonner';

import { fetchCart } from '@/services/cart/client/fetchCart';
import { addItemToCart } from '@/services/cart/client/addItemToCart';
import { removeItemFromCart } from '@/services/cart/client/removeItemFromCart';
import { updateItemQuantity as updateQuantityInCart } from '@/services/cart/client/updateItemQuantity';
import { addPromoCodeApi } from '@/services/cart/client/addPromoCodeApi';

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

  const refreshCart = async () => {
    try {
      const fetchedCart = await fetchCart();
      setCart(fetchedCart);
    } catch {
      setCart(undefined);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addItem = async (item: LineItemDraft) => {
    try {
      const updatedCart = await addItemToCart(item, cart?.id, cart?.version);
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
      const updatedCart = await removeItemFromCart(lineItemId, cart?.id, cart?.version);
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
      const updatedCart = await updateQuantityInCart(lineItemId, quantity, cart?.id, cart?.version);
      setCart(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to update item quantity!');
      } else {
        toast.error('Unexpected error. Please try again!');
      }
    }
  };

  const addPromoCode = async (code: string) => {
    try {
      const updatedCart = await addPromoCodeApi(code, cart?.id, cart?.version);
      setCart(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to add promo code!');
      } else {
        toast.error('Unexpected error. Please try again!');
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        addPromoCode,
        removeItem,
        updateItemQuantity,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
