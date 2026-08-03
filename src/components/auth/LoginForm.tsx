"use client"
import { useAuth } from '@/context/AuthContext';
import { LoginData } from '@/types/user'
import { LoginFormErrors, validateLoginForm } from '@/validators/LoginValidator';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Navbar from '../navbar/Navbar';
import { IoArrowBackOutline } from 'react-icons/io5';
import FormInterface from '../FormInterface';

const LoginForm = () => {
  const { login, isLoading} = useAuth();
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isPaswordsFocus, setIsPasswordFocus] = useState(false);
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

    function togglePasswordVisible() {
      setPasswordType((prev) => prev === "password" ? "text" : "password")
    }

  const backButton = <IoArrowBackOutline/>

  function closingComponent() {
    router.push("/");
  }

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center'>
      <Navbar />
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>
        <FormInterface  handleSubmit={handleSubmit} type='login' formData={formData} isLoading={isLoading} handleChange={handleChange} errors={errors} passFocus={isPaswordsFocus} setPassFocus={setIsPasswordFocus} passwordType={passwordType} apiError={apiError} backButton={backButton} togglePasswordVisible={togglePasswordVisible} closingComponent={closingComponent} />
      </div>
    </div>
  )
}

export default LoginForm