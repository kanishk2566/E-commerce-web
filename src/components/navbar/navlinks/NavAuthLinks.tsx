"use client"
import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import NotLoggedinModal from '../profileModal/NotLoggedinModal';
import LoggedinModal from '../profileModal/LoggedinModal';
import { usePathname } from 'next/navigation';

const NavAuthLinks = () => {

  const { isAuthenticated } = useAuth();
  const [modal, setModal] = useState(false);
  const pathname = usePathname();

  return (
    <div className='relative'>
      <button onClick={() => setModal(prev => !prev)}
    className={`relative flex justify-center items-center px-2 cursor-pointer py-2.75 hover:border-b-2 border-[#401b1b] hover:pb-2.5 hover:bg-[#72383d] hover:rounded-lg transition-all ${pathname === "/profile" || pathname === "/login" || pathname === "/register" ? "border-b-2 pb-2.5 border-[#f2f2eb]" : ""}`}
    >
      <div className={`text-2xl transition-all text-[#f2f2eb]`}><FaUserCircle /></div>
      </button>
      {modal && (
        <div>
          {!isAuthenticated ? (
          <NotLoggedinModal />
        ) : (
          <LoggedinModal />
        )}
        </div>
      )}
    </div>
  )
}

export default NavAuthLinks