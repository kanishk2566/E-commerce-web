import { Product } from '@/types/product'
import React from 'react'
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}
const ProductGrid = ({products}: ProductGridProps) => {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid