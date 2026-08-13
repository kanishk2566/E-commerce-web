import { Product } from '@/types/product'
import React from 'react'
import SuggestedProductItem from './SuggestedProductItem';

interface SuggestedProductsProps {
  product: Product,
  allProducts: Product[],
}

const SuggestedProducts = ({product, allProducts}: SuggestedProductsProps) => {
  const categoryProducts = allProducts.filter((item) => item.category === product.category);
  const suggestedProducts = categoryProducts.filter((item) => item.id !== product.id);

  return (
    <div className='p-8'>
      <p className="text-xl mb-5 border-l-5 border-[#401b1b] px-3 font-bold">
        You may also like
      </p>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {suggestedProducts.map((item) => (
          <div key={item.id}>
            <SuggestedProductItem product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedProducts