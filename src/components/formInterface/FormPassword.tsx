"use client"
import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

interface FormPasswordProps {
  password: string,
  error: string,
  isLoading: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type: "password" | "previousPassword" | "confirmPassword",
  label: string,
}

const FormPassword = ({password, error, isLoading, handleChange, type, label }: FormPasswordProps) => {
  const [passwordType, setPasswordType] = useState("password");
  const [passFocus, setPassFocus] = useState(false);
  return (
      <div className={`flex flex-col justify-center w-full items-start text-lg`}>
                
        <label className='text-sm'>{label}:</label>

        <div className={`flex w-full rounded ${error ? "ring-red-500" : "ring-[#401b1b]"} ${passFocus ? "ring-2" : "ring-0"}`}>

          <input
          className={`rounded-l outline-0 py-2 px-2 w-full bg-gray-300 placeholder:text-sm text-sm `}
          name={type}
          placeholder='Enter password...'
          onFocus={() => setPassFocus(true)}
          onBlur={() => setPassFocus(false)}
          type={passwordType}
          value={password}
          disabled={isLoading}
          onChange={handleChange} />

          <button type='button' onClick={() => setPasswordType((prev) => prev === "password" ? "text" : "password")} className='cursor-pointer bg-gray-300 px-2 flex justify-center items-center rounded-r hover:text-[#72383d] transition-all'>
            {passwordType === "text" ? <BsEye /> : <BsEyeSlash />}
          </button>
          
        </div>
        <div className='text-red-600 text-sm'>
          {error}
        </div>
      </div>
  )
}

export default FormPassword