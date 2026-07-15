/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/Navbar';
import { getProduct } from '@/services/api';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";


interface ProductProps {
  params: Promise<{
    id: string;
  }>;
  
}
async function ProductPage({params}: ProductProps) {
  const cartIcon = <FaShoppingCart />;
  const { id } = await params;
  const product = await getProduct(Number(id));
  return (
    <>
    <Navbar />
    <main className='mx-auto mt-20 relative p-10 flex justify-center h-screen w-screen items-start rounded'>
      <Link 
      className='absolute top-2 left-2 text-4xl'
      href={"/"}><IoIosArrowRoundBack /></Link>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div>
          <img
          src={product.image}
          alt={product.title} 
          className='w-full h-80 object-contain'
          />
        </div>
        <div>
          <div className='text-3xl font-bold'>
            {product.title}
          </div>
          <div className='mt-5 text-gray-600'>
            {product.description}
          </div>
          <div className='mt-5 text-2xl text-green-600 font-bold'>
            ${product.price}
          </div>
          <button className='mt-8 py-2 px-2 flex justify-center items-center gap-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer'>
            Add to cart {cartIcon}
          </button>
        </div>
      </div>
    </main>
    </>
  )
}

export default ProductPage