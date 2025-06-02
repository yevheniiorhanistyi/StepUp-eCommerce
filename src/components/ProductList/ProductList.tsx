import { IProductListParams } from '@/types/types';
import ProductItem from '@/components/ProductItem/ProductItem';

const ProductList = ({ products, isLoading }: IProductListParams): JSX.Element => {
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
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
