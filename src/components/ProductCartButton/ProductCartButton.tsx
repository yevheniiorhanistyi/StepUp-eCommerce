'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

import { IProductCartButtonProps } from '@/types/types';

import { Button } from '../ui/button';

const ProductCartButton = ({ product, productId }: IProductCartButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, addItem, removeItem } = useCart();

  const variantId = product.masterVariant.id;

  const lineItem = cart?.lineItems?.find((item) => item.productId === productId);
  const isInCart = !!lineItem;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsProcessing(true);

    if (isInCart && lineItem) {
      await removeItem(lineItem.id);
    } else {
      await addItem({
        productId,
        variantId,
        quantity: 1
      });
    }

    setIsProcessing(false);
  };

  return (
    <Button
      size="lg"
      variant={isInCart ? 'secondary' : 'default'}
      onClick={handleClick}
      disabled={isProcessing}
      className="w-full cursor-pointer"
    >
      {isProcessing ? (
        <div className="flex items-center justify-center gap-2">
          <div
            className={`h-4 w-4 animate-spin rounded-full border-2 ${
              isInCart ? 'border-black border-t-transparent' : 'border-white border-t-transparent'
            }`}
          />
        </div>
      ) : isInCart ? (
        'Remove from cart'
      ) : (
        'Add to cart'
      )}
    </Button>
  );
};

export default ProductCartButton;
