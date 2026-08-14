import React from 'react'

const HomeLoading = () => {
  return (
    <div>
      <div>
      <div className="mx-auto w-full lg:p-8 p-3 mt-10 lg:mt-15 mb-20 animate-pulse">
        <div className='h-100 w-full bg-gray-200 mb-10' />
        <div className="mb-5 bg-gray-200 h-7 w-30" />
        
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div 
        key={index}
    className='flex flex-col justify-between relative min-h-100 shadow-sm shadow-[#9cabb4] bg-gray-200 ring-[#9cabb4] p-4'>
      <div
      className='w-full mx-auto bg-gray-300 h-58'/>
      <div className='flex flex-col gap-2 mt-2 relative'>
        <div className=' bg-gray-300 min-h-5' />
        <div className='bg-gray-300 min-h-5 w-1/2' />
          
        <div className='h-6 bg-gray-300 mb-2 w-1/5' />

        <div className='h-6 w-6 absolute top-9/12 right-2 bg-gray-300' />
      </div>

      <div className='flex justify-center w-full h-8 bg-gray-300'/>
       
    </div>
      ))}
    </div>
      </div>
    </div>
    </div>
  )
}

export default HomeLoading