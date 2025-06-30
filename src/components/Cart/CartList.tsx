'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import { priceFormat } from '@/lib/utils';

import { ICartItem } from '@/types/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

const CartList = (): JSX.Element => {
  const { cart, removeItem, updateItemQuantity, clearCart, cartTotalQuantity } = useCart();

  const [isClearingCart, setIsClearingCart] = useState(false);
  const [processingItems, setProcessingItems] = useState<Record<string, boolean>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const setProcessingForItem = (id: string, value: boolean) => {
    setProcessingItems((prev) => ({ ...prev, [id]: value }));
  };

  const handleRemove = async (key: string) => {
    if (processingItems[key]) return;
    try {
      setProcessingForItem(key, true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      removeItem(key);
    } finally {
      setProcessingForItem(key, false);
    }
  };

  const handleClearCart = async () => {
    try {
      setIsClearingCart(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      await clearCart();
      setIsDialogOpen(false);
    } finally {
      setIsClearingCart(false);
    }
  };

  const handleUpdateQuantity = async (item: ICartItem, e: React.ChangeEvent<HTMLInputElement>) => {
    if (processingItems[item.key]) return;
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value >= MIN_QUANTITY) {
      try {
        setProcessingForItem(item.key, true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        updateItemQuantity(item.key, value);
      } finally {
        setProcessingForItem(item.key, false);
      }
    }
  };

  const renderEmptyCart = (): JSX.Element => {
    return (
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
    );
  };

  return (
    <div className="flex min-[767.97px]:basis-2/3 max-[768px]:mx-auto w-full flex-col gap-6 pt-5 relative">
      <div className="flex items-center justify-between min-w-full border-b-2 pb-1.5">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button
          type="button"
          className="cursor-pointer duration-300"
          onClick={() => setIsDialogOpen(true)}
          disabled={cartTotalQuantity === 0}
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
              onClick={handleClearCart}
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

      {cartTotalQuantity === 0 && renderEmptyCart()}

      {cart.map((item) => {
        const productKey = item.key;
        const imageUrl = item.image;
        const productName = item.name;
        const size = item.size;

        const hasDiscount = item.originalPrice && item.originalPrice > item.price;
        const unitPrice = priceFormat(item.price / 100);
        const totalPrice = priceFormat((item.price * item.quantity) / 100);
        const baseTotalPrice = item.originalPrice
          ? priceFormat((item.originalPrice * item.quantity) / 100)
          : totalPrice;

        return (
          <Card
            key={item.key}
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
                  min={MIN_QUANTITY}
                  max={MAX_QUANTITY}
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item, e)}
                  disabled={!!processingItems[item.key]}
                  className="w-20 appearance-auto number-visible cursor-pointer"
                />

                <Button
                  type="button"
                  className="cursor-pointer duration-300 min-w-[90px]"
                  onClick={() => handleRemove(item.key)}
                  disabled={!!processingItems[item.key]}
                >
                  {processingItems[item.key] ? (
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
