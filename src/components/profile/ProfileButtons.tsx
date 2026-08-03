import React from 'react'

interface ProfileButtonsProps {
  isLoading: boolean,
  handleLogout: () => void,
  toggleEdit: () => void,
}

const ProfileButtons = ({isLoading, handleLogout, toggleEdit}: ProfileButtonsProps) => {
  return (
    <div className='flex flex-col gap-3 col-span-2 justify-center items-center'>
      <div className='flex flex-col gap-3'>
        <button
        onClick={handleLogout}
        className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all ${isLoading ? "bg-[#ab644b]" : "bg-[#401b1b]"}`}>
          Logout
        </button>

        <button onClick={toggleEdit} className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all ${isLoading ? "bg-[#ab644b]" : "bg-[#401b1b]"}`}>
          Edit Profile
        </button>

        <button className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all ${isLoading ? "bg-[#ab644b]" : "bg-[#401b1b]"}`}>
          Change Password
        </button>
      </div>
    </div>
  )
}

export default ProfileButtons