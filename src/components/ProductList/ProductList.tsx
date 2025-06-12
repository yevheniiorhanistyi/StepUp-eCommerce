'use client';

import { useEffect, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { IProductListParams } from '@/types/types';
import { useCart } from '@/context/CartContext';

import ProductItem from '@/components/ProductItem/ProductItem';

const ProductList = ({ products, isLoading }: IProductListParams): JSX.Element => {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const { cart, addItem, removeItem } = useCart();

  useEffect(() => {
    if (cart) setCartItems(cart.lineItems);
  }, [cart]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-black" />
      </div>
    );
  }

  return (
    <div className="grid w-full mb-10 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          cartItems={cartItems}
          addItem={addItem}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default ProductList;
