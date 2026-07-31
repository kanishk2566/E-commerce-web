"use client"
import React from 'react'
import NavLinks from './navlinks/NavLinks'

const Navbar = () => {

  return (
    <nav className='flex items-center sticky top-0 w-full z-10 justify-between bg-white px-2 md:px-8 shadow-md border-b border-gray-300'>

        <div className='text-xl font-bold text-blue-500 py-2'>
          ShopEasy
        </div>
        <NavLinks />
    </nav>
  )
}

export default Navbar