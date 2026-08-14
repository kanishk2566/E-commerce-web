"use client"
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { motion } from 'motion/react';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({product}: ProductCardProps) => {
  const { addToCart } = useCart();
  const {addToWishlist, wishlist} = useWishlist();
  const isWishlisted = wishlist.some((item) => item.product.id === product.id);

  return (
    
    <motion.div
    id='Products'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className='flex flex-col justify-between relative border border-[#9cabb4] min-h-100 shadow-sm shadow-[#9cabb4] bg-[#D2DCE6] transition ring-[#9cabb4] hover:ring-2 hover:shadow-md p-4'>
      <Link href={`/products/${product.id}`}>
      <Image
      width={500}
      height={408}
      src={product.image}
      alt={product.title} 
      className='h-48 object-contain mx-auto'
      />
      </Link>
      <div className='flex flex-col gap-2 mt-2 relative mb-5'>
        <Link href={`/products/${product.id}`}>
        <p className='font-semibold text-[20px] line-clamp-2 hover:underline transition-all min-h-15'>
          {product.title}
        </p>
        </Link>
          <div className='text-xl font-bold text-[#1c0c0c]'>
            ${(product.price).toFixed(2)}
          </div>
        <div className='flex justify-start items-center'>
          <div className='flex justify-center items-center gap-1'>
            <div className='text-[#edba02]'><FaStar /></div>
              <b className='text-[#401b1b]'>{product.rating.rate}</b>
          </div>
            ({product.rating.count} Reviews)
        </div>
        <button 
        className={`absolute top-9/12 right-2 cursor-pointer transition-all hover:scale-120 ${isWishlisted ? "text-red-500 hover:text-red-600 animate-[spin_0.2s_1]" : "text-[#72383d] hover:text-[#401b1b]"}`}
        onClick={() => {addToWishlist(product)}}>
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
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