"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const NotLoggedinModal = () => {
  const pathname = usePathname();
  return (
    <div className=''>
      <div className='top-10 right-0 pt-3 px-2 pb-3 flex flex-col gap-3 w-fit absolute shadowm-lg shadow-gray-500 border border-[#9cabb4] rounded bg-white'>
        <div className='text-[#401b1b] w-full flex flex-col justify-center items-center text-5xl'>
          <FaUserCircle />
        </div>
        <div className='flex justify-center items-center font-semibold gap-3'>
          <Link
          className={`px-2 w-full rounded hover:bg-[#401b1b] hover:text-[#f2f2e6] transition-all ${pathname === "/register" ? "bg-[#401b1b] text-[#f2f2e6]" : "bg-[#401b1b] text-f2f2eb"}`}
          href={"/register"}>
            <div className='py-0.5 text-[#f2f2e6]'>Register</div>
          </Link>
          |
          <Link
          className={`px-4 w-full rounded hover:bg-[#401b1b] hover:text-[#f2f2e6] transition-all ${pathname === "/login" ? "bg-[#401b1b] text-[#f2f2e6]" : "bg-[#401b1b] text-f2f2eb"}`}
          href={"/login"}>
          <div className='py-0.5 text-[#f2f2e6]'>Login</div>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default NotLoggedinModal