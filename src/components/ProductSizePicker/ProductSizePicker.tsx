'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';

import { IProductSizePickerProps } from '@/types/types';

import ProductSizeSelector from '@/components/ProductSizeSelector/ProductSizeSelector';
import ProductCartButton from '@/components/ProductCartButton/ProductCartButton';

const ProductSizePicker = ({ product, variants }: IProductSizePickerProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, addItem, removeItem } = useCart();

  const productId = product.id;
  const current = product.masterData.current;

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selectedVariant =
    current.variants.find((v) => v.key === selectedKey) ||
    (current.masterVariant.key === selectedKey ? current.masterVariant : null);

  const variantId = selectedVariant?.id;

  const itemFromCart = useMemo(() => {
    if (!variantId) return null;

    return cart?.lineItems?.find(
      (item) => item.productId === productId && item.variant.id === variantId
    );
  }, [cart, productId, variantId]);

  const isInCart = !!itemFromCart;

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

    if (!variantId) return;

    setIsProcessing(true);

    if (itemFromCart) {
      await removeItem(itemFromCart.id);
    } else {
      await addItem({
        productId,
        variantId,
        quantity: 1
      });
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
        cartLineItems={cart?.lineItems || []}
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
