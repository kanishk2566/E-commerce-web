import React from 'react'

interface FormTitleProps {
  type: "login" | "register" | "edit" | "password",
}

const FormTitle = ({type}: FormTitleProps) => {
  return (
    <div>
       {type === "register" && (
          <div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>
          Register to <p className='text-[#401b1b] font-bold'> ShopEasy</p>
          </div>
        )}

        {type === "login" && (
          <div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>
            Login to <p className='text-[#401b1b] font-bold'> ShopEasy</p>
          </div>
        )}

        {type === "edit" && (
          <div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>
            Edit Profile
          </div>
        )}

        {type === "password" && (
          <div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>
            Change Password
          </div>
        )}
    </div>
  )
}

export default FormTitle