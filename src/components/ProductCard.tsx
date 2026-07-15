/* eslint-disable @next/next/no-img-element */
import { Product } from '@/types/product'
import Link from 'next/link';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({product}: ProductCardProps) => {
  const cart = <FaShoppingCart />;
  return (
    <Link href={`/products/${product.id}`}>
      <div className='rounded border relative border-gray-600 min-h-100 shadow-md transition hover:shadow-xl p-4'>
        <img
        src={product.image}
        alt={product.title} 
        className='h-48 object-contain mx-auto'
        />

        <p className='mt-4 font-bold text-[20px] line-clamp-2'>
          {product.title}
        </p>

        <p className='text-lg mt-2 font-bold text-green-600'>
          ${product.price}
        </p>

        <div className='absolute bottom-2 flex justify-center left-0 w-full text-white'>
          <button className='flex justify-center items-center gap-2 rounded py-2 px-2 cursor-pointer bg-blue-600 hover:bg-blue-700'>
            Add to cart {cart}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard