import { getAllProducts, getProduct } from '@/services/products';
import React from 'react'
import ProductDetails from '@/components/products/productDetails/ProductDetails';
import SuggestedProducts from '@/components/products/productDetails/SuggestedProductsGrid';

interface ProductProps {
  params: Promise<{
    id: string;
  }>;
}
async function ProductPage({params}: ProductProps) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  const allProducts = await getAllProducts();

  return (
    <div className='flex flex-col justify-center items-start'>
    <ProductDetails product={product} />
    <SuggestedProducts product={product} allProducts={allProducts} />
    </div>
  )
}

export default ProductPage