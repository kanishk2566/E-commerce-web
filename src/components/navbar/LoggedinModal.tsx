import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiExit } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'

const LoggedinModal = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [hover, setHover] = useState(false);

  function handleLogout() {
    logout();
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
  return (
    <div>
      <div className='top-10 right-0 pt-3 pb-1 px-2 flex flex-col gap-3 w-fit absolute shadowm-lg shadow-gray-500 border border-gray-400 rounded bg-white'>

        <Link
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        href={"/profile"} className={`rounded py-3 flex flex-col px-5 justify-center items-center gap-3 transition-all ${hover ? "bg-gray-300 text-gray-600" : "bg-gray-200 text-gray-400"}`}>

          <div className='w-full flex flex-col justify-center items-center text-5xl'>
            <FaUserCircle />
          </div>

          <div
          className={`w-full rounded text-gray-700`}>
            <div className='py-0.5 flex justify-center items-center gap-1'>Profile <FaUserCircle /></div>
          </div>
          
        </Link>

        <div className='flex justify-center items-center font-semibold gap-3'>

          <div
          onClick={handleLogout}
          className={`px-2 w-full rounded bg-gray-200 hover:bg-red-300 hover:text-red-900 text-red-600 transition-all`}>

            <div className='py-0.5 flex justify-center items-center gap-1'> Logout <BiExit /></div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default LoggedinModal