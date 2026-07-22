"use client"
import React from 'react'
import NavLinks from './NavLinks'
import { useAuth } from '@/context/AuthContext'

type InCartProps = {
  inCart: boolean,
  inHome: boolean,
  inRegister: boolean,
  inLogin: boolean
}
const Navbar = ({inCart, inHome, inRegister, inLogin}: InCartProps) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className='flex items-center fixed top-0 w-full z-999 justify-between bg-white px-2 md:px-8 shadow-md border-b border-gray-300'>

        <div className='text-xl font-bold text-blue-500 py-2'>
          ShopEasy
        </div>
        {isAuthenticated && (
          <div className='text-blue-500 font-bold'>
            Hello, {user?.name}
          </div>
        )}
        <NavLinks IsCart={inCart} IsHome={inHome} IsRegister={inRegister} IsLogin={inLogin}/>
    </nav>
  )
}

export default Navbar