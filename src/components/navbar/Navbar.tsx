"use client"
import React from 'react'
import NavLinks from './navlinks/NavLinks'

const Navbar = () => {
  return (
    <nav className='flex items-center sticky top-0 w-full z-10 justify-between bg-[#401b1b] px-2 md:px-8 shadow-md '>

        <div className='text-xl font-bold text-[#f2f2eb] py-2'>
          ShopEasy
        </div>
        <NavLinks />
    </nav>
  )
}

export default Navbar