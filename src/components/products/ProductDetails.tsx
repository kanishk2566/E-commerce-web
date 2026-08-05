"use client"
import Navbar from '@/components/navbar/Navbar';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FaShoppingCart, FaStar } from "react-icons/fa";
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
      <Navbar />
    <main className='mx-auto relative py-10 px-5 flex justify-center items-start rounded mt-15 lg:mt-20 mb-20'>
      <Link 
      className='absolute top-0 left-2 text-xl flex justify-center items-center'
      href={"/"}><IoIosArrowBack />
      <p className='text-sm'>Continue Shopping</p>
      </Link>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div className='border border-[#9cabb4] py-10 rounded'>
          <Image
          src={product.image}
          alt={product.title}
          width={0}
          height={0}
          sizes="100vw"
          className='w-full h-96 object-contain hover:h-98 transition-all'
          />
        </div>
        <div>
          <p className='text-xl font-bold'>
            {product.title}
          </p>
          <div className='mt-2 text-2xl text-[#1c0c0c] font-bold'>
            ${(product.price).toFixed(2)}
          </div>
          <div className='flex flex-col justify-center items-start mt-2'>
          <div className='text-yellow-500 mr-1 flex justify-center items-center'>
            <FaStar />
             <b className='text-[#401b1b]'>{product.rating.rate}</b>
          </div>
            ({product.rating.count} Reviews)
          </div>
          <div className='flex flex-col mt-4 justify-center items-start gap-1'>
          <p className='uppercase font-semibold'>{product.category}</p>
          <p className=''>
            {product.description}
          </p>
          </div>
          <button
          onClick={() => addToCart(product.id)}
          className='mt-8 py-3 w-full flex justify-center items-center gap-2 transition-all text-white bg-[#72383d] rounded hover:bg-[#401b1b] cursor-pointer'>
            Add to cart <FaShoppingCart />
          </button>
        </div>
      </div>
    </main>
    </div>
  )
}

export default ProductDetails