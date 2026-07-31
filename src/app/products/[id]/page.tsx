import { getProduct } from '@/services/products';
import React from 'react'
import ProductDetails from '@/components/products/ProductDetails';

interface ProductProps {
  params: Promise<{
    id: string;
  }>;
}
async function ProductPage({params}: ProductProps) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  return (
    <div className='flex justify-center items-start'>
    <ProductDetails product={product} />
    </div>
  )
}

export default ProductPage