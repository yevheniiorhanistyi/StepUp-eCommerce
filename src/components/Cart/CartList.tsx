'use client';

import { useCart } from '@/context/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import Link from 'next/link';
import { priceFormat } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

const extractAttributeValue = (attr: {
  name: string;
  value: string | { key?: string; label?: string };
}): string => {
  const { value } = attr;
  if (typeof value === 'object' && value !== null) {
    return value.label || value.key || '';
  }

  return value;
};

const CartList = (): JSX.Element => {
  const { cart, removeItem, updateItemQuantity, clearCart } = useCart();
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [processingItems, setProcessingItems] = useState<Record<string, boolean>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const setProcessingForItem = (id: string, value: boolean) => {
    setProcessingItems((prev) => ({ ...prev, [id]: value }));
  };

  const handleRemove = async (id: string) => {
    if (processingItems[id]) return;
    try {
      setProcessingForItem(id, true);
      await removeItem(id);
    } finally {
      setProcessingForItem(id, false);
    }
  };

  return (
    <div className="flex min-[767.97px]:basis-2/3 max-[768px]:mx-auto w-full flex-col gap-6 pt-5 relative">
      <div className="flex items-center justify-between min-w-full border-b-2 pb-1.5">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button
          type="button"
          className="cursor-pointer duration-300"
          onClick={() => setIsDialogOpen(true)}
          disabled={isClearingCart || cart?.lineItems.length === 0 || !cart}
        >
          {isClearingCart ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            'Clear Cart'
          )}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Clear Shopping Cart</DialogTitle>
            <DialogDescription>This will remove all items from your cart.</DialogDescription>
          </DialogHeader>
          <p>
            Are you sure you want to remove all items from your cart? This action cannot be undone.
          </p>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              className="cursor-pointer duration-300 min-w-[90px]"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isClearingCart}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="cursor-pointer duration-300 min-w-[90px]"
              onClick={async () => {
                try {
                  setIsClearingCart(true);
                  await clearCart();
                  setIsDialogOpen(false);
                } finally {
                  setIsClearingCart(false);
                }
              }}
              disabled={isClearingCart}
            >
              {isClearingCart ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Confirm'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {(cart?.lineItems.length === 0 || !cart) && (
        <>
          <div className="text-center text-lg text-muted-foreground">
            Your shopping cart is empty.
          </div>
          <Link
            href="/catalog"
            className="text-center text-lg underline underline-offset-4 text-black hover:text-neutral-600 transition-colors font-bold"
          >
            Go to Catalog.
          </Link>
        </>
      )}
      {cart?.lineItems.map((item) => {
        const productKey = item.productKey || item.productId;
        const imageUrl = item.variant?.images?.[0]?.url || '';
        const productName = item.name?.['en-US'] || '';
        const sizeAttr = item.variant?.attributes?.find((attr) => attr.name === 'size');
        const size = sizeAttr ? extractAttributeValue(sizeAttr) : '';

        const itemPrice = priceFormat(item.price?.value?.centAmount / 100) || '0.00';
        const itemDiscountedPrice = item.price.discounted
          ? item.price?.discounted?.value?.centAmount / 100
          : 0;
        const hasDiscount = itemDiscountedPrice > 0;
        const unitPrice = hasDiscount ? priceFormat(itemDiscountedPrice) : itemPrice;

        const baseTotalPrice = priceFormat(parseFloat(itemPrice) * item.quantity);
        const totalPrice = priceFormat(item.totalPrice?.centAmount / 100);

        return (
          <Card
            key={item.id}
            className="flex min-[451px]:max-h-[250px] flex-row max-[450px]:flex-col gap-6 p-4 items-stretch"
          >
            <Link
              href={`/product/${productKey}`}
              className="shrink basis-1/3 max-[450px]:min-h-[250px] bg-transparent rounded-md flex items-center justify-center overflow-hidden self-stretch relative"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={productName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="max-w-full max-h-full max-[450px]:h-full max-[450px]:w-full object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground">No image</span>
              )}
            </Link>

            <CardContent className="p-0 basis-1/3 flex flex-col gap-4 justify-between grow">
              <div>
                <Link href={`/product/${productKey}`} className="text-lg font-semibold">
                  {productName}
                </Link>
                {size && <div className="text-sm text-muted-foreground">Size: {size}</div>}
              </div>

              <div className="flex flex-col grow min-h-[52px]">
                <div className="flex gap-1 font-semibold items-end text-primary text-xl">
                  {hasDiscount ? (
                    <>
                      <span>${totalPrice}</span>
                      <span className="line-through text-muted-foreground text-base">
                        ${baseTotalPrice}
                      </span>
                    </>
                  ) : (
                    <span>${totalPrice}</span>
                  )}
                </div>
                {item.quantity > 1 ? (
                  <div className="text-muted-foreground">${unitPrice} / pair</div>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min={1}
                  max={99}
                  value={item.quantity}
                  onChange={async (e) => {
                    if (processingItems[item.id]) return;
                    const value = Number(e.target.value);
                    if (!Number.isNaN(value) && value >= 1) {
                      try {
                        setProcessingForItem(item.id, true);
                        await updateItemQuantity(item.id, value);
                      } finally {
                        setProcessingForItem(item.id, false);
                      }
                    }
                  }}
                  disabled={!!processingItems[item.id]}
                  className="w-20 appearance-auto number-visible cursor-pointer"
                />

                <Button
                  type="button"
                  className="cursor-pointer duration-300 min-w-[90px]"
                  onClick={() => handleRemove(item.id)}
                  disabled={!!processingItems[item.id]}
                >
                  {processingItems[item.id] ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    'Remove'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default CartList;
