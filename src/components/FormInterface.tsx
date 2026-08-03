"use client"
import { ChangePasswordData, EditData, LoginData, RegisterData } from '@/types/user'
import { ChangePasswordFormError } from '@/validators/ChangePasswordValidator'
import { EditFormErrors } from '@/validators/EditValidator'
import { LoginFormErrors } from '@/validators/LoginValidator'
import { RegisterFormErrors } from '@/validators/RegisterValidator'
import Link from 'next/link'
import React from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

interface FormInterfaceProps {
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>,
  type: "login" | "register" | "edit" | "password",
  formData: LoginData | RegisterData | EditData | ChangePasswordData,
  isLoading: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: LoginFormErrors | RegisterFormErrors | EditFormErrors | ChangePasswordFormError,
  passFocus?: boolean,
  setPassFocus?: React.Dispatch<React.SetStateAction<boolean>>,
  confirmPassFocus?: boolean,
  setConfirmPassFocus?: React.Dispatch<React.SetStateAction<boolean>>,
  oldPassFocus?: boolean,
  setOldPassFocus?: React.Dispatch<React.SetStateAction<boolean>>,
  passwordType?: string,
  apiError: string,
  togglePasswordVisible?: () => void,
  backButton: React.ReactNode,
  closingComponent: () => void,
}

const FormInterface = ({handleSubmit, formData, isLoading, handleChange, errors, passFocus, setPassFocus, confirmPassFocus, setConfirmPassFocus, oldPassFocus, setOldPassFocus, apiError, backButton, togglePasswordVisible, passwordType, type, closingComponent}: FormInterfaceProps) => {

  const loginData = formData as LoginData;
  const registerData = formData as RegisterData;
  const editData = formData as EditData;
  const changePasswordData = formData as ChangePasswordData;

  const loginErrors = errors as LoginFormErrors;
  const registerErrors = errors as RegisterFormErrors;
  const editErrors = errors as EditFormErrors;
  const changePasswordError = errors as ChangePasswordFormError;

  return (
      <form
      className={`relative flex flex-col justify-center items-center gap-2 py-5 px-5 border border-gray-300 rounded w-full mx-2 md:w-1/2 lg:w-1/4 ${type === 'edit' || 'password' ? "bg-white" : "shadow-lg shadow-gray-500"}`}
      onSubmit={handleSubmit}>

        {type === "register" ? (<div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>Register to <p className='text-[#401b1b] font-bold'> ShopEasy</p>
        
        </div>) : (<div></div>)}

        {type === "login" ? (<div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>Login to <p className='text-[#401b1b] font-bold'> ShopEasy</p>
        
        </div>) : (<div></div>)}

        {type === "edit" ? (<div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>
          Edit Profile
        </div>) : (<div></div>)}


        <div className='w-full h-full flex flex-col justify-center gap-3'>

          {type !== "login" && type !== "password" ? (
            <div className='flex flex-col justify-center items-start text-lg'>

            <label className='text-sm'>Name:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${registerErrors.name ? "ring-red-500" : "ring-[#401b1b]"}`}
            name='name'
            placeholder='Enter name...'
            value={registerData.name}
            disabled={isLoading}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {registerErrors.name}
            </div>

          </div>
          ) : (<div></div>)}

          {type !== "password" && (
            <div className='flex flex-col justify-center items-start text-lg'>

            <label className='text-sm'>Email:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${loginErrors.email || registerErrors.email || editErrors.email ? "ring-red-500" : "ring-[#401b1b]"}`}
            name='email'
            placeholder='Enter email...'
            value={loginData.email || registerData.email || editData.email}
            disabled={isLoading}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {loginErrors.email || registerErrors.email || editErrors.email}
            </div>
          </div>
          )}
          
          {(type !== "edit" && type === 'password' && setOldPassFocus)? (
            <div className={`flex flex-col justify-center w-full items-start text-lg`}>
          
            <label className='text-sm'>Previous password:</label>

            <div className={`flex w-full rounded ${registerErrors.password || loginErrors.password ? "ring-red-500" : "ring-[#401b1b]"} ${oldPassFocus ? "ring-2" : "ring-0"}`}>

              <input
              className={`rounded-l outline-0 py-2 px-2 w-full bg-gray-300 placeholder:text-sm text-sm `}
              name='previousPassword'
              placeholder='Enter previous password...'
              onFocus={() => setOldPassFocus(true)}
              onBlur={() => setOldPassFocus(false)}
              type={passwordType}
              value={changePasswordData.previousPassword}
              disabled={isLoading}
              onChange={handleChange} />

              <button type='button' onClick={togglePasswordVisible} className='cursor-pointer bg-gray-300 px-2 flex justify-center items-center rounded-r'>
                {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}
              </button>
              
            </div>
            <div className='text-red-600 text-sm'>
              {loginErrors.password || registerErrors.password || changePasswordError.previousPassword}
            </div>
          </div>
          ) : (<div></div>)}

          {(type !== "edit" && setPassFocus) ? (
            <div className={`flex flex-col justify-center w-full items-start text-lg`}>
          
            <label className='text-sm'>New password:</label>

            <div className={`flex w-full rounded ${registerErrors.password || loginErrors.password ? "ring-red-500" : "ring-[#401b1b]"} ${passFocus ? "ring-2" : "ring-0"}`}>

              <input
              className={`rounded-l outline-0 py-2 px-2 w-full bg-gray-300 placeholder:text-sm text-sm `}
              name='password'
              placeholder='Enter new password...'
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              type={passwordType}
              value={changePasswordData.password || loginData.password || registerData.password}
              disabled={isLoading}
              onChange={handleChange} />

              <button type='button' onClick={togglePasswordVisible} className='cursor-pointer bg-gray-300 px-2 flex justify-center items-center rounded-r'>
                {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}
              </button>
              
            </div>
            <div className='text-red-600 text-sm'>
              {changePasswordError.confirmPassword}
            </div>
          </div>
          ) : (<div></div>)}

          {(type !== "edit" && type === "password" && setConfirmPassFocus) ? (
            <div className={`flex flex-col justify-center w-full items-start text-lg`}>
          
            <label className='text-sm'>Confirm password:</label>

            <div className={`flex w-full rounded ${registerErrors.password || loginErrors.password ? "ring-red-500" : "ring-[#401b1b]"} ${confirmPassFocus ? "ring-2" : "ring-0"}`}>

              <input
              className={`rounded-l outline-0 py-2 px-2 w-full bg-gray-300 placeholder:text-sm text-sm`}
              name='confirmPassword'
              placeholder='Confirm password...'
              onFocus={() => setConfirmPassFocus(true)}
              onBlur={() => setConfirmPassFocus(false)}
              type={passwordType}
              value={changePasswordData.confirmPassword || ""}
              disabled={isLoading}
              onChange={handleChange} />

              <button type='button' onClick={togglePasswordVisible} className='cursor-pointer bg-gray-300 px-2 flex justify-center items-center rounded-r'>
                {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}
              </button>
              
            </div>
            <div className='text-red-600 text-sm'>
              {changePasswordError.confirmPassword}
            </div>
          </div>
          ) : (<div></div>)}

          <div className='text-red-600 text-sm'>{apiError}</div>

        </div>
        <button
        type='submit'
        disabled={isLoading}
        className={`py-1 px-3 rounded font-semibold text-white mt-2 cursor-pointer bg-[#401b1b]`}>
          {type === "register" ? "Register" : ""}
          {type === "login" ? "Login" : ""}
          {type === "edit" ? "Save" : ""}
          {type === "password" ? "Change Password" : ""}
          </button>

        {(type === "register" || type === "login" )&& (
          <div className='text-sm'>
          <p className='text-[#72383d]'>Already have an account? <Link href={type === "login" ? "/login" : "/register"} className='text-[#401b1b] hover:underline'>{type === "login" ? "Login" : "Register"}</Link></p>
        </div>
        )}

        <div 
        onClick={closingComponent}
        className={`hover:underline hover:text-[#72383d] transition-all absolute top-2 md:top-3 lg:top-2 cursor-pointer ${type === "edit" || "password" ? "righ-2 md:right-3 lg:right-2" : "left-2 md:left-3 lg:left-2"}`}>
          {backButton}
        </div>
      </form>
  )
}

export default FormInterface