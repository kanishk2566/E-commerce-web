"use client"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import React from 'react'

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/")
  }
  return (
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
        
        <button onClick={handleLogout} className='py-1 px-4 bg-blue-500 text-white rounded'>Logout</button>
      </div>

    </div>
  )
}

export default ProfilePage