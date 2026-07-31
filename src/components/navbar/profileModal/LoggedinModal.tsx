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
      <div className='top-10 right-0 pt-3 pb-1 px-2 flex flex-col gap-3 w-fit absolute shadowm-lg shadow-gray-500 border border-gray-400 rounded bg-[#f2f2e6]'>

        <Link
        href={"/profile"} className={`rounded py-3 flex flex-col px-5 justify-center items-center gap-3 transition-all bg-[#d2dce6] text-gray-600 hover:opacity-80`}>

          <div className='w-full flex flex-col justify-center items-center text-5xl'>
            <FaUserCircle />
          </div>

          <div
          className={`w-full rounded text-gray-700`}>
            <div className='py-0.5 flex justify-center items-center gap-1'>Profile <FaUserCircle /></div>
          </div>
          
        </Link>

        <div className='flex justify-center items-center font-semibold gap-3'>

          <button
          type='button'
          onClick={handleLogout}
          className={`px-2 w-full rounded bg-[#d2dce6] hover:opacity-80 transition-all cursor-pointer`}>

            <div className='py-0.5 flex justify-center items-center gap-1'> Logout <BiExit /></div>

          </button>

        </div>
      </div>
    </div>
  )
}

export default LoggedinModal