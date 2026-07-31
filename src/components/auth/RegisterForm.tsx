"use client"
import { useAuth } from '@/context/AuthContext'
import { RegisterData } from '@/types/user';
import { RegisterFormErrors, validateRegisterForm } from '@/validators/RegisterValidator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import Navbar from '../navbar/Navbar';
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';

const RegisterCard = () => {
  const { register, isLoading } = useAuth();
  const [errors, setErrors] = useState<RegisterFormErrors>({
    name: "",
    password: "",
    email: "",
  });
  const [apiError, setApiError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passFocus, setPassFocus] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    setApiError("");
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }))
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = validateRegisterForm(formData);
      setErrors(result.errors);

      if(!result.isValid) return;

      await register(formData);
      router.push("/");
    }
    catch(apiError) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError.message);
      }
    }
  }

  function togglePasswordVisible() {
    setPasswordType((prev) => prev === "password" ? "text" : "password");
  }

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center'>

      <Navbar />
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>
        <form
      className='relative flex flex-col justify-center items-center gap-2 py-5 px-5 border border-gray-300 shadow-lg shadow-gray-500 rounded w-full mx-2 md:w-1/2 lg:w-1/4'
      onSubmit={handleSubmit}>

        <div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>Register to <p className='text-[#401b1b] font-bold'> ShopEasy</p></div>

        <div className='w-full h-full flex flex-col justify-center gap-3'>

          <div className='flex flex-col justify-center items-start text-lg'>

            <label className='text-sm'>Name:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${errors.name ? "ring-red-500" : "ring-[#401b1b]"}`}
            name='name'
            placeholder='Enter name...'
            value={formData.name}
            disabled={isLoading}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {errors.name}
            </div>

          </div>

          <div className='flex flex-col justify-center items-start text-lg'>

            <label className='text-sm'>Email:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${errors.email ? "ring-red-500" : "ring-[#401b1b]"}`}
            name='email'
            placeholder='Enter email...'
            value={formData.email}
            disabled={isLoading}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {errors.email}
            </div>

          </div>
          
          <div className={`flex flex-col justify-center w-full items-start text-lg`}>
          
            <label className='text-sm'>Password:</label>

            <div className={`flex w-full rounded ${errors.password ? "ring-red-500" : "ring-[#401b1b]"} ${passFocus ? "ring-2" : "ring-0"}`}>

              <input
              className={`rounded-l outline-0 py-2 px-2 w-full bg-gray-300 placeholder:text-sm text-sm `}
              name='password'
              placeholder='Enter password...'
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              type={passwordType}
              value={formData.password}
              disabled={isLoading}
              onChange={handleChange} />

              <button type='button' onClick={togglePasswordVisible} className='cursor-pointer bg-gray-300 px-2 flex justify-center items-center rounded-r'>
                {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}
              </button>
              
            </div>
            <div className='text-red-600 text-sm'>
              {errors.password}
            </div>
          </div>
          <div className='text-red-600 text-sm'>{apiError}</div>

        </div>
        <button
        type='submit'
        disabled={isLoading}
        className={`py-1 px-3 rounded font-semibold text-white mt-2 cursor-pointer bg-[#401b1b]`}>{isLoading ? "Creating Account" : "Register"}</button>

        <div className='text-sm'>
          <p className='text-[#72383d]'>Already have an account? <Link href={"/login"} className='text-[#401b1b] hover:underline'>Login</Link></p>
        </div>

        <Link className='hover:underline hover:text-[#72383d] transition-all absolute top-2 left-2 md:top-3 md:left-3 lg:top-2 lg:left-2' href={"/"}><IoArrowBackOutline /></Link>
      </form>
      </div>
    </div>
  )
}

export default RegisterCard