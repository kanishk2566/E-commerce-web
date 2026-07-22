import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import React from 'react'

type NavAuthLinksProps = {
  IsRegister: boolean,
  IsLogin: boolean,
}
const NavAuthLinks = ({IsRegister, IsLogin}: NavAuthLinksProps) => {

  const { isAuthenticated, logout } = useAuth();
  return (
    <div>
      {!isAuthenticated ? (
          <div className='flex justify-center items-center'>
          <Link
          className={`hover:border-b-2 border-blue-500 hover:pb-1.5 py-2 px-3 h-full ${IsRegister ? "border-b-2 pb-1.5" : ""}`}
          href={"/register"}>
            <div className='py-1'>Register</div>
          </Link>
          <Link
          className={`hover:border-b-2 border-blue-500 hover:pb-1.5 py-2 px-3 h-full ${IsLogin ? "border-b-2 pb-1.5" : ""}`}
          href={"/login"}>
            <div className='py-1'>Login</div>
          </Link>
        </div>
        ) : (
          <div className='flex justify-center items-center'>
            <button className='cursor-pointer hover:border-b-2 border-blue-500 hover:pb-1.5 py-2 px-3 h-full' onClick={logout}>
            <div className='py-1'>Logout</div>
          </button>
          </div>
        )}
    </div>
  )
}

export default NavAuthLinks