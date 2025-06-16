import { IProductCartButtonProps } from '@/types/types';

import { Button } from '@/components/ui/button';

const ProductCartButton = ({ isInCart, isProcessing, onClick }: IProductCartButtonProps) => {
  return (
    <Button
      size="lg"
      className="w-full cursor-pointer"
      variant={isInCart ? 'secondary' : 'default'}
      disabled={isProcessing}
      onClick={(e) => onClick(e)}
    >
      {isProcessing ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : isInCart ? (
        'Remove from cart'
      ) : (
        'Add to cart'
      )}
    </Button>
  );
};

export default ProductCartButton;
