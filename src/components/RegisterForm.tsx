"use client"
import { useAuth } from '@/context/AuthContext'
import { RegisterData } from '@/types/user';
import { validateRegisterForm } from '@/validators/RegisterValidator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import Navbar from './Navbar';

const RegisterCard = () => {
  const { register, isLoading } = useAuth();
  const [errors, setErrors] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [apiError, setApiError] = useState("");
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
    setErrors({...errors, [e.target.name]: ""})
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await validateRegisterForm(formData);
      setErrors(result.errors);

      if(!result.isValid) return;

      await register(formData);
      router.push("/");
    }
    catch(apiError: unknown) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError.message);
      }
    }
  }

  return (
    <div className='w-full h-full min-h-screen flex justify-center items-center'>

      <Navbar inCart={false} inHome={false} inRegister={true} inLogin={false} />
      
      <form
      className='relative flex flex-col justify-center items-center gap-2 py-5 px-5 border border-gray-300 shadow-lg shadow-gray-500 rounded w-full mx-2 md:w-1/2 lg:w-1/4'
      onSubmit={handleSubmit}>

        <div className='text-xl font-semibold flex justify-center items-baseline gap-2'>Register to <p className='text-blue-600 font-bold'> ShopEasy</p></div>

        <div className='w-full h-full flex flex-col justify-center gap-3'>

          <div className='flex flex-col justify-center items-start text-lg'>

            <label className='text-sm'>Name:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${errors.name ? "ring-red-500" : "ring-blue-500"}`}
            name='name'
            placeholder='Enter name...'
            value={formData.name}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {errors.name}
            </div>

          </div>

          <div className='flex flex-col justify-center items-start text-lg'>

            <label className='text-sm'>Email:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${errors.email ? "ring-red-500" : "ring-blue-500"}`}
            name='email'
            placeholder='Enter email...'
            value={formData.email}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {errors.email}
            </div>

          </div>

          <div className='flex flex-col justify-center items-start text-lg'>

            <label className='text-sm'>Password:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${errors.password ? "ring-red-500" : "ring-blue-500"}`}
            name='password'
            placeholder='Enter password...'
            type='password'
            value={formData.password}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {errors.password}
            </div>

          </div>
          <div className='text-red-600 text-sm'>{apiError}</div>

        </div>
        <button 
        disabled={isLoading}
        className={`py-1 px-3 rounded font-semibold text-white mt-2 cursor-pointer ${isLoading ? "bg-blue-200" : "bg-blue-500"}`}>{isLoading ? "Creating Account" : "Register"}</button>

        <Link className='hover:underline hover:text-blue-600 transition-all absolute top-2 left-2 md:top-3 md:left-3 lg:top-2 lg:left-2' href={"/"}><IoArrowBackOutline /></Link>
      </form>
    </div>
  )
}

export default RegisterCard