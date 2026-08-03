"use client"
import { useAuth } from '@/context/AuthContext'
import { ChangePasswordData } from '@/types/user';
import { ChangePasswordFormError, validateChangePasswordForm } from '@/validators/ChangePasswordValidator';
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';
import FormInterface from '../FormInterface';

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
  const [passwordType, setPasswordType] = useState('password');
  const [passFocus, setPassFocus] = useState(false);
  const [confirmPassFocus, setConfirmPassFocus] = useState(false);
  const [oldPassFocus, setOldPassFocus] = useState(false);
  
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

   function togglePasswordVisible() {
    setPasswordType((prev) => prev === "password" ? "text" : "password")
  }

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center bg-black/60 fixed top-0 left-0'>
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>
        <FormInterface handleSubmit={handleSubmit} type='password' formData={formData} isLoading={isLoading} handleChange={handleChange} errors={errors} passFocus={passFocus} setPassFocus={setPassFocus} passwordType={passwordType} apiError={apiError} togglePasswordVisible={togglePasswordVisible} backButton={backButton} closingComponent={toggleChangePassword} setOldPassFocus={setOldPassFocus} oldPassFocus={oldPassFocus} confirmPassFocus={confirmPassFocus} setConfirmPassFocus={setConfirmPassFocus} />
      </div>
    </div>
  )
}

export default ChangePassword