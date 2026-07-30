"use client"
import { Product } from '@/types/product'
import React from 'react'
import ProductCard from './ProductCard';
import { useAuth } from '@/context/AuthContext';

interface ProductGridProps {
  products: Product[];
}
const ProductGrid = ({products}: ProductGridProps) => {
  const {isLoading} = useAuth();

  if(!isLoading) {
    return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default ProductGrid