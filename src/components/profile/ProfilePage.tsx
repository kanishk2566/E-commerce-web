"use client"
import React from 'react'
import ProfileHeader from './ProfileHeader'
import Navbar from '../navbar/Navbar'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import ProfileInfo from './ProfileInfo'
import ProfileCartInfo from './ProfileCartInfo'
import ProfileButtons from './ProfileButtons'

const ProfilePage = () => {
  const router = useRouter();
  const {user, logout, isLoading } = useAuth();
   function handleLogout() {
    logout();
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
    if(user) {
      const name = user.name;

      const initials = name.trim().split(" ").map(part => part[0].toUpperCase()).join("");

      const createdAt = user.createdAt;

      const since = createdAt.split("").toSpliced(0, 3);
      console.log(since);
    return (
      <div className='flex justify-evenely flex-col items-center gap-5 min-h-screen'>
        <Navbar />
        <div className='text-xl font-bold'>My Profile</div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ProfileHeader user={user} initials={initials} />
        <ProfileInfo since={since} />
        <ProfileCartInfo />
        <ProfileButtons isLoading={isLoading} handleLogout={handleLogout} />
        </div>
      </div>
    )
  }
  {
      return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='flex-1 flex justify-center items-center'>
        You must login to view profile...!
      </div>
    </div>
  )
  }
  
}

export default ProfilePage