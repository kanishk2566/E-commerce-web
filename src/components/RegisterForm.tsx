/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useAuth } from '@/context/AuthContext'
import { RegisterData } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const RegisterCard = () => {
  const { user, register } = useAuth();
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
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
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
//read last conversation
  return (
    <div className='w-full h-full min-h-screen flex justify-center items-center'>
      <form
      className='flex flex-col justify-center items-center gap-5 py-5 px-5 border border-gray-300 shadow-lg shadow-gray-500 rounded w-full mx-2 md:w-1/2 lg:w-1/4'
      onSubmit={handleSubmit}>

        <p className='text-2xl font-semibold'>Register</p>

        <div className='w-full h-full flex flex-col gap-3'>

          <div className='flex flex-col justify-center items-start text-lg gap-1'>

            <label className='font-semibold'>Name:</label>
            <input
            className='rounded outline-0 py-1 px-2 w-full bg-gray-300 focus:ring-1 ring-blue-500'
            name='name'
            value={formData.name}
            onChange={handleChange} />

          </div>

          <div className='flex flex-col justify-center items-start text-lg gap-1'>


            <label className='font-semibold'>Email:</label>
            <input
            className='rounded outline-0 py-1 px-2 w-full bg-gray-300 focus:ring-1 ring-blue-500'
            name='email'
            value={formData.email}
            onChange={handleChange} />

          </div>

          <div className='flex flex-col justify-center items-start text-lg gap-1'>

            <label className='font-semibold'>Password:</label>
            <input
            className='rounded outline-0 py-1 px-2 w-full bg-gray-300 focus:ring-1 ring-blue-500'
            name='password'
            value={formData.password}
            onChange={handleChange} />

          </div>

        </div>
        <button className='w-full py-2 bg-blue-500 rounded font-bold text-white mt-2'>Submit</button>
      </form>
    </div>
  )
}

export default RegisterCard