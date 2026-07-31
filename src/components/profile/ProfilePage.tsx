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

  if(user) {
    const name = user.name;

    const initials = name.trim().split(" ").map(part => part[0].toUpperCase()).join("");

    return (
    <div>
      <Navbar />
      <div className='w-full h-full min-h-screen flex justify-center items-center'>

        <div className='flex flex-col justify-center gap-4'>

          <div className='flex flex-col justify-center items-center'>

            <div className='text-7xl bg-blue-500 text-blue-100 w-30 h-30 flex justify-center items-center font-semibold rounded-full mb-2'>
              {initials}
            </div>

              <div className='font-semibold'>
                {user?.name}
              </div>
              <div className='font-semibold'>
                {user?.email}
              </div>

          </div>
          
          <button onClick={handleLogout} className={`py-1 px-4 text-white rounded ${isLoading ? "bg-yellow-500" : "bg-blue-500"}`}>Logout</button>
        </div>

      </div>
    </div>
  )
  }

  return (
    <div>
      You must login to view profile...!
    </div>
  )
  
}

export default ProfilePage