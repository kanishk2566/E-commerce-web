import React from 'react'

interface ProfileButtonsProps {
  isLoading: boolean,
  handleLogout: () => void,
  toggleEditPage: () => void,
  toggleChangePassword: () => void,

}

const ProfileButtons = ({isLoading, handleLogout, toggleEditPage, toggleChangePassword}: ProfileButtonsProps) => {
  return (
    <div className='flex flex-col gap-3 justify-start h-full items-center p-10'>
      <div className='flex flex-col gap-3'>

        <button onClick={toggleEditPage} className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all ${isLoading ? "bg-[#ab644b]" : "bg-[#401b1b]"}`}>
          Edit Profile
        </button>

        <button 
        onClick={toggleChangePassword}
        className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all ${isLoading ? "bg-[#ab644b]" : "bg-[#401b1b]"}`}>
          Change Password
        </button>

        <button
        onClick={handleLogout}
        className={`py-1 px-4 text-white rounded cursor-pointer hover:opacity-90 transition-all ${isLoading ? "bg-[#ab644b]" : "bg-[#401b1b]"}`}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileButtons