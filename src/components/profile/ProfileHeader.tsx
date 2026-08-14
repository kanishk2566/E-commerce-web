"use client"
import React from 'react'
import { AuthUser } from '@/types/user';

interface ProfileHeaderProps {
  user: AuthUser | null,
  initials: string,
}

const ProfileHeader = ({user, initials}: ProfileHeaderProps) => {

    return (
    <div>
      <div className=' flex flex-col justify-evenly items-center'>

            <div className='flex flex-col justify-center items-center'>
              <div className='text-5xl lg:text-7xl bg-[#72383D] text-[#f2f2eb] w-20 h-20 lg:w-30 lg:h-30 flex justify-center items-center font-semibold rounded-full'>
              {initials}
              </div>

            <div className='font-semibold text-xl'>
                {user?.name}
              </div>
            </div>
        </div>
    </div>

  )


}
export default ProfileHeader