import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useAuth } from '@/context/AuthContext';

interface ProfileInfoProps {
  since: string[];
}

const ProfileInfo = ({since}: ProfileInfoProps) => {
  const {user} = useAuth();
  return (
    <div className='flex flex-col justify-center items-start'>

        <div className='flex justify-start items-center gap-2'>
          <b><FaUser /></b> {user?.name}
        </div>
        <div className='flex justify-start items-center gap-2'>
          <b><MdOutlineAlternateEmail /></b> {user?.email}
        </div>
        <div className='flex justify-start items-center gap-2'>
          <b><FaCalendarAlt /></b> {since}
        </div>

    </div>
  )
}

export default ProfileInfo