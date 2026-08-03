"use client"
import { useAuth } from '@/context/AuthContext'
import { EditData } from '@/types/user';
import { EditFormErrors, validateEditForm } from '@/validators/EditValidator';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import FormInterface from '../FormInterface';
import { CgClose } from 'react-icons/cg';

interface EditProfileProps {
  toggleEditPage: () => void
}

const EditProfile = ({toggleEditPage}: EditProfileProps) => {
  const { editProfile, isLoading, user } = useAuth();
  const [errors, setErrors] = useState<EditFormErrors>({
    name: "",
    email: "",
  });
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState<EditData>({
    name: user?.name || "",
    email: user?.email || ""
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
      const result = validateEditForm(formData);
      setErrors(result.errors);

      if(!result.isValid) return;

      if(!user) return;

      await editProfile(user?.id, formData);
      toast.success("Profile Updated..!!");

    }
    catch(apiError) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError.message);
      }
    }
  }

  const backButton = <CgClose />

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center bg-black/60 fixed top-0 left-0'>
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>
        <FormInterface handleSubmit={handleSubmit} type='edit' formData={formData} isLoading={isLoading} handleChange={handleChange} errors={errors} apiError={apiError} backButton={backButton} closingComponent={toggleEditPage} />
      </div>
    </div>
  )
}

export default EditProfile