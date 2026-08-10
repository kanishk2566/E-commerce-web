"use client"
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { Wishlist } from '@/types/wishlist';
import { useWishlist } from '@/context/WishlistContext';

interface WishlistItemProps { 
  product: Wishlist;
}

const WishlistItem = ({product}: WishlistItemProps) => {
  const { addToCart } = useCart();
  const { removeFromWishlist} = useWishlist();

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className='flex flex-col justify-between relative border border-[#9cabb4] min-h-100 min-w-60 shadow-sm shadow-[#9cabb4] bg-[#D2DCE6] transition ring-[#9cabb4] hover:ring-2 hover:shadow-md p-4'>
      <Link href={`/products/${product.product.id}`}>
      <Image
      width={500}
      height={408}
      src={product.product.image}
      alt={product.product.title} 
      className='h-48 object-contain mx-auto'
      />
      </Link>
      <div className='flex flex-col gap-2 mt-2'>
        <Link href={`/products/${product.product.id}`}>
        <p className='font-semibold text-[20px] line-clamp-2 hover:underline transition-all min-h-15'>
          {product.product.title}
        </p>
        </Link>
        <p className='text-xl font-bold text-[#1c0c0c]'>
          ${(product.product.price).toFixed(2)}
        </p>
      </div>

      <div className='flex flex-col gap-2 justify-center w-full font-bold mt-3'>
        <button
        onClick={() => {addToCart(product.product.id)}}
        className='flex justify-center items-center gap-2 w-full rounded py-2 px-2 cursor-pointer bg-[#b6c9d4] hover:opacity-80 transition-all'>
          Add to cart <FaShoppingCart />
        </button>
        <button
        onClick={() => {removeFromWishlist(product.product)}}
        className='flex justify-center items-center gap-2 w-full rounded py-2 px-2 text-red-600 hover:opacity-90 cursor-pointer hover:bg-red-300 bg-[#b6c9d4] transition-all'>
          Remove
        </button>
      </div>
    </motion.div>
  )
}

export default WishlistItem