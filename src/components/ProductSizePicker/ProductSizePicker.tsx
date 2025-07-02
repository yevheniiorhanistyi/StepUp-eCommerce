'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';

import ProductSizeSelector from '@/components/ProductSizeSelector/ProductSizeSelector';
import ProductCartButton from '@/components/ProductCartButton/ProductCartButton';

import { IProductSizePickerProps, ICartItem } from '@/types/types';

import { getPrice } from '@/lib/utils';

const ProductSizePicker = ({ product, variants }: IProductSizePickerProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, addItem, removeItem } = useCart();

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.key === selectedKey) || null,
    [selectedKey, variants]
  );

  const isInCart = useMemo(() => {
    return !!cart.find((item) => item.key === selectedKey);
  }, [cart, selectedKey]);

  useEffect(() => {
    if (!selectedKey && variants.length > 0) {
      setSelectedKey(variants[0].key);
    }
  }, [selectedKey, variants]);

  const handleSizeChange = (newKey: string) => {
    setSelectedKey(newKey);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedVariant || !selectedKey) return;

    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (isInCart) {
      removeItem(selectedKey);
    } else {
      const newItem: ICartItem = {
        key: selectedKey,
        name: product.name,
        originalPrice: product.prices[0].value.centAmount,
        price: getPrice(product),
        image: product.images[0],
        size: selectedVariant.size,
        quantity: 1
      };

      addItem(newItem);
    }

    setIsProcessing(false);
  };

  if (!selectedKey) {
    return <div className="text-sm text-muted-foreground">Loading product options...</div>;
  }

  return (
    <>
      <div className="mb-1">Select Size</div>
      <ProductSizeSelector
        variants={variants}
        currentKey={selectedKey}
        onChange={handleSizeChange}
        cartLineItems={cart}
      />

      <div className="mt-4 md:w-auto md:max-w-[200px]">
        <ProductCartButton
          isInCart={isInCart}
          onClick={handleAddToCart}
          isProcessing={isProcessing}
        />
      </div>
    </>
  );
};

export default ProductSizePicker;
