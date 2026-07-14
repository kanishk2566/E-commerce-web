/* eslint-disable @next/next/no-img-element */
import { Product } from '@/types/product'
import Link from 'next/link';
import React from 'react'

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({product}: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className='rounded border relative border-gray-600 min-h-100 shadow-md transition hover:shadow-xl p-4'>
        <img
        src={product.image}
        alt={product.title} 
        className='h-48 object-contain mx-auto'
        />

        <p className='mt-4 font-bold line-clamp-2'>
          {product.title}
        </p>

        <p className='text-lg mt-2 font-semibold text-green-600'>
          ${product.price}
        </p>

        <button className='px-2 absolute bottom-2 left-2 rounded bg-blue-600 py-2 text-white hover:bg-blue-700 cursor-pointer'>
          Add to cart
        </button>
      </div>
    </Link>
  )
}

export default ProductCard