'use client';

import { useCart } from '@/context/CartContext';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { priceFormat } from '@/lib/utils';

const CENTS_IN_DOLLAR = 100;

const OrderBlock = (): JSX.Element => {
  const { cart, cartTotalQuantity, cartTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const shipping = cartTotalQuantity > 0 ? 1000 : 0;
  const originalTotalPrice = cart.reduce((sum, item) => {
    return sum + (item.originalPrice ?? item.price) * item.quantity;
  }, 0);

  const discount = originalTotalPrice - cartTotalPrice;
  const hasDiscount = discount > 0;

  const formattedShipping = priceFormat(shipping / CENTS_IN_DOLLAR);
  const formattedDiscount = priceFormat(discount / CENTS_IN_DOLLAR);
  const formattedOriginalTotal = priceFormat(originalTotalPrice / CENTS_IN_DOLLAR);
  const formattedTotal = priceFormat((cartTotalPrice + shipping) / CENTS_IN_DOLLAR);

  const applyPromo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!promoCode.trim()) {
      toast.error('Promo code is empty!');

      return;
    }

    setIsApplying(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Promo applied!');
    setPromoCode('');
    setIsApplying(false);
  };

  return (
    <Card className="flex flex-col bg-transparent gap-4 self-start max-[767.97px]:mx-auto max-[600px]:w-full">
      <CardHeader className="text-2xl font-bold border-b-2">Order Summary</CardHeader>

      <CardContent className="flex flex-col gap-1 text-[16px] font-semibold border-b-2 pb-4">
        <p className="flex justify-between">
          Cart Total: <span>${formattedOriginalTotal}</span>
        </p>
        <p className="flex justify-between">
          Shipping: <span>${formattedShipping}</span>
        </p>
        {hasDiscount && (
          <p className="flex justify-between">
            Promo: <span>- ${formattedDiscount}</span>
          </p>
        )}
        <p className="flex justify-between text-[18px] border-t-2 pt-4">
          Total:
          <span className="flex items-end gap-1">
            {hasDiscount ? (
              <>
                <span className="text-primary font-bold">${formattedTotal}</span>
                <span className="line-through text-muted-foreground text-base">
                  ${formattedOriginalTotal}
                </span>
              </>
            ) : (
              <span>${formattedTotal}</span>
            )}
          </span>
        </p>
      </CardContent>

      <CardFooter className="flex flex-col items-start border-b-2 pb-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem className="flex flex-col gap-2" value="promo-code">
            <AccordionTrigger className="text-base font-medium cursor-pointer duration-300 py-0 hover:no-underline">
              Have a promo code?
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <form onSubmit={applyPromo} className="flex flex-col w-full gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  disabled={isApplying}
                />
                <Button type="submit" disabled={isApplying}>
                  {isApplying ? 'Applying...' : 'Apply'}
                </Button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>

      <CardAction className="flex flex-col gap-2 px-6 w-full">
        <Button className="cursor-pointer duration-300 w-full" disabled={cartTotalQuantity === 0}>
          Proceed to Checkout
        </Button>
        <p className="text-sm text-muted-foreground">* Taxes and shipping calculated at checkout</p>
      </CardAction>
    </Card>
  );
};

export default OrderBlock;
