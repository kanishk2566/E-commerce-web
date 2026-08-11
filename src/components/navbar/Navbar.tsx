"use client"
import React, { ReactNode, SetStateAction } from 'react'
import NavLinks from './navlinks/NavLinks'
import NavAuthLinks from './navlinks/NavAuthLinks';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

interface navbarProps {
  children?: ReactNode,
  isSearchFocus?: boolean,
  setIsSearchFocus?: React.Dispatch<SetStateAction<boolean>>,
}

const Navbar = ({children, setIsSearchFocus, isSearchFocus}: navbarProps) => {
  const pathname = usePathname();

  return (
    <nav className='flex items-center fixed bottom-0 lg:top-0 w-full z-100 justify-between bg-[#401b1b] px-2 md:px-8 h-fit shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.5)]'>

        <div className='flex justify-between items-center text-xl px-5 font-bold text-[#401b1b] lg:text-[#f2f2eb] fixed top-0 left-0 lg:top-2 w-full lg:w-fit  bg-linear-to-b from-gray-300 to-transparent lg:bg-none'>
          
            <div className={`lg:pl-5 ${isSearchFocus ? "hidden lg:block" : "block"}`}>
              ShopEasy
            </div>

          <div className='lg:hidden flex justify-center items-center gap-2'>
              {isSearchFocus && (
                <div>
                  {children}
                </div>
              )}
                <div
                onClick={() => {if(setIsSearchFocus){setIsSearchFocus(!isSearchFocus)}}}
                className={`block lg:hidden w-fit hover:bg-[#9cabb4] rounded-full px-1 py-1 ${pathname === "/" ? "block" : "hidden"}`}>
                  {isSearchFocus ? <IoClose /> : <FaSearch />}
                </div>
            <NavAuthLinks />
          </div>
        </div>

        <div className='w-2 h-2'></div>

        <div className={`hidden lg:block`}>
          {children}
        </div>

        <NavLinks />
    </nav>
  )
}

export default Navbar