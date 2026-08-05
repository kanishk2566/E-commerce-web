"use client"
import { useAuth } from '@/context/AuthContext'
import { ChangePasswordData } from '@/types/user';
import { ChangePasswordFormError, validateChangePasswordForm } from '@/validators/ChangePasswordValidator';
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';
import FormTitle from '../formInterface/FormTitle';
import FormPassword from '../formInterface/FormPassword';
import SubmitButton from '../formInterface/SubmitButton';
import { motion } from 'motion/react';

interface ChangePasswordProps {
  toggleChangePassword: () => void,
}

const ChangePassword = ({toggleChangePassword}: ChangePasswordProps) => {
  const {changePassword, isLoading, user} = useAuth();
  const [errors, setErrors] = useState<ChangePasswordFormError>({
    password: "",
    confirmPassword: "",
    previousPassword: "",
  });
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState<ChangePasswordData>({
    previousPassword: "",
    password: "",
    confirmPassword: "",
  });

  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    setApiError("");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if(user) {
        const result = await validateChangePasswordForm(formData, user.id);
        setErrors(result.errors);

        if(!result.isValid) return;

        await changePassword(user.id, formData);
        toast.success("Password changed...!");
      }
    }
    catch(apiError) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError);
      }
    }
  }

  const backButton = <CgClose />

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center bg-black/60 fixed top-0 left-0'>
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>

        <motion.form 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true }}
        exit={{opacity: 0}}
        className='relative flex flex-col justify-center items-center gap-2 py-5 px-5 border border-gray-300 rounded w-full mx-2 md:w-1/2 lg:w-1/4 bg-white'
        onSubmit={handleSubmit}>

          <FormTitle type='password' />
          
          <FormPassword password={formData.previousPassword} isLoading={isLoading} handleChange={handleChange} error={errors.previousPassword}type='previousPassword' label='Previous Password' />

          <FormPassword password={formData.password} isLoading={isLoading} handleChange={handleChange} error={errors.password} type='password' label='New Password' />

          <FormPassword password={formData.confirmPassword} isLoading={isLoading} handleChange={handleChange} error={errors.confirmPassword} type='confirmPassword' label='Confirm Password' />

          <SubmitButton apiError={apiError} text={isLoading ? "Updating Profile" : "Save"} isLoading={isLoading} />
          
        <div 
        onClick={toggleChangePassword}
        className={`hover:underline hover:text-[#72383d] transition-all absolute top-2 md:top-3 lg:top-2 cursor-pointer right-2 md:right-3 lg:right-2`}>
          {backButton}
        </div>
        </motion.form>

      </div>
    </div>
  )
}

export default ChangePassword