"use client"
import { useAuth } from '@/context/AuthContext';
import { LoginData } from '@/types/user'
import { LoginFormErrors, validateLoginForm } from '@/validators/LoginValidator';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Navbar from '../navbar/Navbar';
import { IoArrowBackOutline } from 'react-icons/io5';
import FormEmail from '../formInterface/FormEmail';
import FormPassword from '../formInterface/FormPassword';
import SubmitButton from '../formInterface/SubmitButton';
import FormTitle from '../formInterface/FormTitle';
import Link from 'next/link';

const LoginForm = () => {
  const { login, isLoading} = useAuth();
  const [errors, setErrors] = useState<LoginFormErrors>({
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
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = validateLoginForm(formData);
      setErrors(result.errors);

      if(!result.isValid) return;
      await login(formData);
      router.push("/");

    } catch(apiError) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError.message);
      }
    }
  }

  const backButton = <IoArrowBackOutline/>

  function closingComponent() {
    router.push("/");
  }

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center'>
      <Navbar />
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>

        <form className='relative flex flex-col justify-center items-center gap-2 py-5 px-5 border border-gray-300 rounded w-full mx-2 md:w-1/2 lg:w-1/4 bg-white shadow-lg shadow-gray-500'
        onSubmit={handleSubmit}
        >

        <FormTitle type='login' />

        <FormEmail email={formData.email} error={errors.email} isLoading={isLoading} handleChange={handleChange} />

        <FormPassword  password={formData.password} error={errors.password} isLoading={isLoading} handleChange={handleChange} type='password' label='Password' />

        <SubmitButton isLoading={isLoading} text={isLoading ? "Loggin in" : "Login"} apiError={apiError} />

        <div className='text-sm'>
          <p className='text-[#72383d]'>Already have an account? <Link href={"/register"} className='text-[#401b1b] hover:underline'>
            {isLoading ? "Creating Account" : "Register"}
            </Link>
          </p>
        </div>

        <div 
        onClick={closingComponent}
        className={`hover:underline hover:text-[#72383d] transition-all absolute top-2 md:top-3 lg:top-2 cursor-pointer left-2 md:left-3 lg:left-2`}>
          {backButton}
        </div>

        </form>        
      </div>
    </div>
  )
}

export default LoginForm