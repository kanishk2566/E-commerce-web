import React from 'react'
import Navbar from '../navbar/Navbar'

const CartLoading = () => {
  return (
    <div>
      <div>
      <Navbar />
      <div className="flex flex-col gap-4 h-fit animate-pulse mt-20">
        <div className="h-8 w-40 bg-gray-200 ml-5 rounded" />
        <div className="flex-col flex lg:flex-row gap-4 h-full">
      <div className="flex-1 flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
        <div 
        key={index}
        className='flex rounded mx-5 gap-5'>
          <div className='border border-gray-200 p-2 rounded-l bg-gray-200 flex justify-center items-center min-h-30 min-w-30'/>

          <div 
          className='flex justify-start flex-1 items-center gap-5 ml-1 p-3 bg-gray-200 border border-gray-200 rounded-r relative'>
  
            <div className='flex flex-col gap-2 rounded'>

              <div className='h-5 w-full bg-gray-300 rounded'/>

              <div className='w-fit flex justify-center items-center rounded gap-1'>

                <div className='rounded-l w-5 h-7 bg-gray-300'/>

                <div className='px-2 bg-gray-300 w-5 h-7'/>

                <div
                className='rounded-r w-5 h-7 bg-gray-300'/>   

              </div>

              <div className='bg-gray-300 h-7 w-20 rounded'/>

            </div>

            <div
            className='flex justify-center items-center gap-1 absolute right-2 bottom-2 md:right-2 bg-gray-300 py-1 px-2 rounded h-5 w-20'/>

          </div>
        </div>
      ))}
      </div>

      <div className='lg:w-3/10 mx-5 flex flex-col gap-2 h-50 w-3/10'>
          
          <div className='flex gap-10 flex-col'>
            
            <div className={`bg-gray-200 p-5 rounded-2xl w-full overflow-clip relative`}>
      
              <div className='mb-2 pb-2 bg-gray-300 h-8'/>
            
              <div className='flex flex-col gap-3 h-4 bg-gray-300'/>
      
              </div>
      
              <div className='w-full rounded-full py-2 h-10 bg-gray-300'/>
      
            </div>
      
          </div>
    </div>
      </div>
    </div>
    </div>
  )
}

export default CartLoading