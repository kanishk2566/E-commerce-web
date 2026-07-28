"use client"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import React from 'react'
import Navbar from '../navbar/Navbar';

const ProfilePage = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
  return (
    <div>
      <Navbar inCart={false} inHome={false} inLogin={false} inRegister={false} inProfile={true} />
      <div className='w-full h-full min-h-screen flex justify-center items-center'>

        <div className='flex flex-col justify-center gap-4'>

          <div className='flex flex-col justify-center items-start'>

            <div className='flex justify-start items-start gap-3'>

              <div className='font-bold'>Name:</div>

              <div className='font-semibold'>{user?.name}</div>
              
            </div>

            <div className='flex justify-start items-start gap-3'>

              <div className='font-bold'>Email:</div>
              
              <div className='font-semibold'>{user?.email}</div>

            </div>

          </div>
          
          <button onClick={handleLogout} className={`py-1 px-4 text-white rounded ${isLoading ? "bg-yellow-500" : "bg-blue-500"}`}>Logout</button>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage