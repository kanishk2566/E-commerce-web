import React from 'react'
import Navbar from '../navbar/Navbar'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

const ProductLoading = () => {
  return (
    <div className='flex justify-center items-start w-full'>
      <Navbar />
    <main className='mx-auto relative py-10 px-5 flex justify-center items-start rounded mt-15 lg:mt-20 mb-20 w-full'>
      <Link
      className='absolute top-0 left-2 flex justify-center items-center'
      href={"/"}><IoIosArrowBack />
      <p className=''>Continue Shopping</p>
      </Link>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 w-full'>
        <div className='py-10 rounded bg-gray-200 w-full h-96'/>

        <div className='flex flex-col gap-3'>

          <div className='bg-gray-200 h-7 w-2/3'/>

          <div className='bg-gray-200 h-9 w-20'/>

          <div className='flex flex-col justify-center items-start bg-gray-200 h-4 w-20'/>

          <div className='flex justify-center items-center bg-gray-200 h-4 w-20'/>

          <div className=' h-8 w-1/2 bg-gray-200' />

          <div className='flex flex-col justify-center items-start gap-1'>

            <div className='w-full h-3 bg-gray-200' />
            <div className='w-full h-3 bg-gray-200' />
            <div className='w-full h-3 bg-gray-200' />
            <div className='w-7/12 h-3 bg-gray-200' />

          </div>

          <div className='mt-8 py-3 w-full flex justify-center items-center gap-2 bg-gray-200 h-12 rounded'/>
          
        </div>
      </div>
    </main>
    </div>
  )
}

export default ProductLoading