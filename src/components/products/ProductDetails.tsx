"use client"
import Navbar from '@/components/navbar/Navbar';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductProps {
  product: Product;
}

function ProductDetails({product}: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div className='flex justify-center items-start'>
    <div className='fixed top-0 w-full z-999'>
      <Navbar />
    </div>
    <main className='mx-auto relative p-10 flex justify-center items-start rounded'>
      <Link 
      className='absolute top-2 left-2 text-4xl'
      href={"/"}><IoIosArrowRoundBack /></Link>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div>
          <Image
          src={product.image}
          alt={product.title}
          width={0}
          height={0}
          sizes="100vw"
          className='w-full h-80 object-contain'
          />
        </div>
        <div>
          <p className='text-3xl font-bold'>
            {product.title}
          </p>
          <p className='mt-5 text-gray-600'>
            {product.description}
          </p>
          <div className='mt-5 text-2xl text-green-600 font-bold'>
            ${(product.price).toFixed(2)}
          </div>
          <button
          onClick={() => addToCart(product.id)}
          className='mt-8 py-2 px-2 flex justify-center items-center gap-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer'>
            Add to cart <FaShoppingCart />
          </button>
        </div>
      </div>
    </main>
    </div>
  )
}

export default ProductDetails