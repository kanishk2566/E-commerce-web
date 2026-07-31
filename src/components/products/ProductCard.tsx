"use client"
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({product}: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    
    <div className='flex flex-col justify-between rounded border relative border-gray-600 min-h-100 shadow-md transition hover:shadow-xl p-4'>
      <Link href={`/products/${product.id}`}>
      <Image
      width={500}
      height={408}
      src={product.image}
      alt={product.title} 
      className='h-48 object-contain mx-auto'
      />
      </Link>
      <div>
        <Link href={`/products/${product.id}`}>
        <p className='font-bold text-[20px] line-clamp-2'>
          {product.title}
        </p>
        </Link>
        <p className='text-lg font-bold text-green-600'>
          ${(product.price).toFixed(2)}
        </p>
      </div>

      <div className='flex justify-center w-full text-white'>
        <button
        onClick={() => {addToCart(product.id)}}
        className='flex justify-center items-center gap-2 rounded py-2 px-2 cursor-pointer bg-blue-600 hover:bg-blue-700'>
          Add to cart <FaShoppingCart />
        </button>
      </div>
    </div>
  )
}

export default ProductCard