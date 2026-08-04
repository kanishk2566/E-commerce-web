"use client"
import React, { ReactNode, useState } from 'react'
import NavLinks from './navlinks/NavLinks'
import NavAuthLinks from './navlinks/NavAuthLinks';

interface navbarProps {
  children?: ReactNode,
}

// add sidebar for pagination 

const Navbar = ({children}: navbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className='flex items-center fixed bottom-0 lg:top-0 w-full z-10 justify-between bg-[#401b1b] px-2 md:px-8 h-fit shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.5)]'>

        <div className='flex justify-between items-center text-xl font-bold text-[#401b1b] lg:text-[#f2f2eb] fixed top-0 left-0 lg:top-2 w-full lg:w-fit px-3 bg-linear-to-b from-gray-300 to-transparent lg:bg-none'>
          ShopEasy

          <div className='block lg:hidden'>
            <NavAuthLinks />
          </div>
        </div>

        <div className='w-2 h-2'></div>

        <div className={`${isSearchOpen ? "block" : "hidden lg:block"}`}>
          {children}
        </div>

        <div
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className='block lg:hidden text-[#f2f2eb]'>
          Search
        </div>

        <NavLinks />
    </nav>
  )
}

export default Navbar