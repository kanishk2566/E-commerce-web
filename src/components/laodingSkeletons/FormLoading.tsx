import React from 'react'
import Navbar from '../navbar/Navbar'

interface FormLoadingProps {
  register: boolean,
}

const FormLoading = ({register}: FormLoadingProps) => {
  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center'>
      <Navbar />
      
      <div className='h-full w-full flex justify-center items-center mt-7 lg:mt-20 mb-20 animate-pulse'>

        <div
        className='relative flex flex-col justify-center items-center gap-4 py-5 px-5 border border-gray-300 rounded w-full mx-2 md:w-1/2 lg:w-1/4 bg-gray-200 shadow-lg shadow-gray-500'>

        <div className='w-30 h-8 bg-gray-300' />

        <div className='flex flex-col gap-6 w-full h-full'>
          <div className='w-full h-8 bg-gray-300' />
          <div className='w-full h-8 bg-gray-300' />
          {register &&
          <div className='w-full h-8 bg-gray-300' />
          }
        </div>

        <div className='w-20 h-8 bg-gray-300' />

        <div className='h-4 w-10/12 bg-gray-300'>
        </div>

        </div>        
      </div>
    </div>
  )
}

export default FormLoading