"use client"
import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import NotLoggedinModal from './NotLoggedinModal';
import LoggedinModal from './LoggedinModal';

type NavAuthLinksProps = {
  IsRegister: boolean,
  IsLogin: boolean,
  IsProfile: boolean,
}
const NavAuthLinks = ({IsRegister, IsLogin, IsProfile}: NavAuthLinksProps) => {

  const { isAuthenticated } = useAuth();
  const [modal, setModal] = useState(false);
  return (
    <div onClick={() => setModal(!modal)}
    className={`relative flex justify-center items-center px-2 cursor-pointer py-2.75 hover:border-b-2 border-blue-500 hover:pb-2.5 hover:bg-gray-200 hover:rounded-lg transition-all ${IsProfile ? "border-b-2 pb-2.5 border-blue-500" : ""}`}
    >
      <div className={`text-2xl transition-all ${modal ? "text-blue-500" : "text-gray-500"}`}><FaUserCircle /></div>
      {modal && (
        <div>
          {!isAuthenticated ? (
          <NotLoggedinModal IsLogin={IsLogin} IsRegister={IsRegister} />
        ) : (
          <LoggedinModal />
        )}
        </div>
      )}
    </div>
  )
}

export default NavAuthLinks