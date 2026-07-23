import Link from 'next/link'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type NavAuthLinksProps = {
  IsRegister: boolean,
  IsLogin: boolean,
}

const NotLoggedinModal = ({IsRegister, IsLogin}: NavAuthLinksProps) => {
  return (
    <div>
      <div className='top-10 right-0 pt-3 pb-1 px-2 flex flex-col gap-3 w-fit absolute shadowm-lg shadow-gray-500 border border-gray-400 rounded bg-white'>
            <div className='text-gray-400 w-full flex flex-col justify-center items-center text-5xl'>
              <FaUserCircle />
            </div>
          <div className='flex justify-center items-center font-semibold gap-3'>
            <Link
            className={`px-2 w-full rounded hover:bg-blue-500 hover:text-white transition-all ${IsRegister ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            href={"/register"}>
              <div className='py-0.5'>Register</div>
            </Link>
            <Link
            className={`px-4 w-full rounded hover:bg-blue-500 hover:text-white transition-all ${IsLogin ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            href={"/login"}>
              <div className='py-0.5'>Login</div>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default NotLoggedinModal