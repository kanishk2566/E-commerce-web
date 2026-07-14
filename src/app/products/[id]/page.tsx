/* eslint-disable @next/next/no-img-element */
import { getProduct } from '@/services/api';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

interface ProductProps {
  params: Promise<{
    id: string;
  }>;
}
async function ProductPage({params}: ProductProps) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  return (
    <main className='mx-auto relative max-w-5xl p-10 flex justify-center items-center rounded shadow-[0_0_15px_rgba(0,0,0,0.5)]'>
      <Link 
      className='absolute top-5 left-5 text-4xl'
      href={"/"}><IoIosArrowRoundBack /></Link>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div>
          <img
          src={product.image}
          alt={product.title} 
          className='h-96 w-full object-contain'
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
          <button className='mt-8 py-3 px-6 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer'>
            Add to cart
          </button>
        </div>
      </div>

    </main>
  )
}

export default ProductPage