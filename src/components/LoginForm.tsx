"use client"
import { useAuth } from '@/context/AuthContext';
import { LoginData } from '@/types/user'
import { validateLoginForm } from '@/validators/LoginValidator';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Navbar from './Navbar';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';

const LoginForm = () => {
  const { login, isLoading} = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev, 
      [e.target.name] : e.target.value,
    }));
    setApiError("");
    setErrors((prev) => ({...prev, [e.target.name]: ""}));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await validateLoginForm(formData);
      setErrors(result.errors);

      if(!result.isValid) return;

      await login(formData);
      router.push("/");
    } catch(apiError: unknown) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError.message);
      }
    }
  }

  return (
    <div className='flex justify-center items-center w-full h-full min-h-screen'>
      <Navbar inCart={false} inHome={false} inRegister={false} inLogin={true} />

      <form
      className='flex justify-center items-center flex-col gap-2 relative py-5 px-5 shadow-lg shadow-gray-500 border border-gray-300 w-full md:w-1/2 lg:w-1/4'
      onSubmit={handleSubmit}
      >
        <div className='text-xl font-semibold flex justify-center items-center gap-2 w-full'>
          Login to <p className='font-bold text-blue-500'>ShopEasy</p>
        </div>

        <div className='flex flex-col justify-center items-start w-full gap-3'>

          <div className='w-full flex flex-col'>

            <label>Email:</label>
            <input
            className={`w-full rounded outline-0 bg-gray-300 py-2 px-2 text-sm focus:ring-2 ${errors.email ? "ring-red-500" : "ring-blue-500"}`}
            value={formData.email}
            name='email'
            onChange={handleChange}
            placeholder='Enter email...' />
            <div className='text-sm text-red-500'>{errors.email}</div>

          </div>

          <div className='w-full flex flex-col'>

            <label>Password:</label>
            <input
            className={`w-full rounded outline-0 bg-gray-300 py-2 px-2 text-sm focus:ring-2 ${errors.password ? "ring-red-500" : "ring-blue-500"}`}
            value={formData.password}
            name='password'
            onChange={handleChange}
            type='password'
            placeholder='Enter password...' />
            <div className='text-sm text-red-500'>{errors.password}</div>
            
          </div>
          
          <div className='text-sm text-red-500'>{apiError}</div>

        </div>

        <button
        type='submit'
        className={`py-1 px-3 rounded font-semibold text-white mt-2 cursor-pointer ${isLoading ? "bg-blue-200" : "bg-blue-500"}`}>{isLoading ? "Logging in" : "Log in"}</button>

        <Link className='hover:underline hover:text-blue-600 transition-all absolute top-2 left-2 md:top-3 md:left-3 lg:top-2 lg:left-2' href={"/"}><IoArrowBackOutline /></Link>
      </form>
    </div>
  )
}

export default LoginForm