import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiExit } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'

const LoggedinModal = () => {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }
  return (
    <div>
      <div className='top-10 right-0 pt-3 pb-1 px-2 flex flex-col gap-3 w-fit absolute shadowm-lg shadow-gray-500 border border-gray-400 rounded bg-white'>
            <div className='text-gray-400 w-full flex flex-col justify-center items-center text-5xl'>
              <FaUserCircle />
            </div>
          <div className='flex justify-center items-center font-semibold gap-3'>
            <Link
            href={"/profile"}
            className={`px-2 w-full rounded bg-gray-200 hover:bg-blue-100 text-blue-600 transition-all`}>
              <div className='py-0.5 flex justify-center items-center gap-1'>Profile <FaUserCircle /></div>
            </Link>
            <div
            onClick={handleLogout}
            className={`px-2 w-full rounded bg-gray-200 hover:bg-red-100 text-red-600 transition-all`}>
              <div className='py-0.5 flex justify-center items-center gap-1'> Logout <BiExit /></div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LoggedinModal