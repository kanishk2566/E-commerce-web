"use client"
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({product}: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    
    <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className='flex flex-col justify-between rounded relative border border-[#9cabb4] min-h-100 shadow-sm shadow-[#9cabb4] transition ring-[#9cabb4] hover:ring-2 hover:shadow-md p-4'>
      <Link href={`/products/${product.id}`}>
      <Image
      width={500}
      height={408}
      src={product.image}
      alt={product.title} 
      className='h-48 object-contain mx-auto'
      />
      </Link>
      <div className='flex flex-col gap-2 mt-2'>
        <Link href={`/products/${product.id}`}>
        <p className='font-semibold text-[20px] line-clamp-2 hover:underline transition-all min-h-15'>
          {product.title}
        </p>
        </Link>
        <p className='text-xl font-bold text-[#1c0c0c]'>
          ${(product.price).toFixed(2)}
        </p>
      </div>

      <div className='flex justify-center w-full text-white'>
        <button
        onClick={() => {addToCart(product.id)}}
        className='flex justify-center items-center gap-2 w-full rounded py-2 px-2 cursor-pointer bg-[#72383d] hover:bg-[#401b1b] transition-all'>
          Add to cart <FaShoppingCart />
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard