import React from 'react'
import Navbar from '../navbar/Navbar'

const ProfileLoading = () => {
  return (
    <div>
      <div
      className='flex justify-evenely flex-col items-center min-h-screen w-full'>

        <Navbar />
        
        <div className='mt-20 lg:mt-20 mb-20 flex flex-col justify-center items-center gap-5 w-full px-8'>

        <div className='flex flex-col justify-center items-center w-full lg:grid grid-cols-2 gap-3 lg:w-7/12 bg-gray-200 xl:w-1/2 p-5 border rounded shadow-[0_0_20px_3px_rgba(0,0,0,0.2)]'>

        <div className='text-xl font-bold border-l-5 px-3 flex justify-start col-span-2 items-start w-fit h-7 bg-gray-300 text-gray-300'>My Profile</div>

        <div>
          <div className=' flex flex-col justify-evenly items-center'>

            <div className='flex flex-col justify-center items-center'>
              <div className='text-5xl lg:text-7xl bg-gray-300 text-[#f2f2eb] w-20 h-20 lg:w-30 lg:h-30 flex justify-center items-center font-semibold rounded-full'/>

              <div className='font-semibold text-xl h-5 w-full bg-gray-300 mt-3'/>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center text-lg py-5 gap-2 lg:order-4'>
          <div className='w-full flex justify-center items-center gap-2 font-bold text-xl py-3 bg-gray-300 h-7'/>
        
            <div className='flex justify-center items-center gap-2 h-5 bg-gray-300 w-2/3'/>
            <div className='flex justify-center items-center gap-2 h-5 bg-gray-300 w-2/3'/>
            <div className='flex justify-center items-center gap-2 h-5 bg-gray-300 w-2/3'/>

        </div>

          <div className='flex flex-col justify-center items-center text-lg py-5 gap-2'>
            <div className='w-full flex justify-center items-center gap-2 font-bold text-xl py-3 bg-gray-300 h-7'/>
        
            <div className='flex justify-center items-center gap-2 h-5 bg-gray-300 w-2/3'/>
            <div className='flex justify-center items-center gap-2 h-5 bg-gray-300 w-2/3'/>
            <div className='flex justify-center items-center gap-2 h-5 bg-gray-300 w-2/3'/>
        
          </div>

         <div className='flex flex-col gap-3 justify-start h-full w-full items-center p-10'>
          <div className='flex flex-col gap-3 w-3/4'>

            <div className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all bg-gray-300 w-full h-7`}/>
            <div className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all bg-gray-300 w-full h-7`}/>
            <div className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all bg-gray-300 w-full h-7`}/>

          </div>
        </div>

        </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLoading