"use client"
import { useAuth } from '@/context/AuthContext'
import { EditData } from '@/types/user';
import { EditFormErrors, validateEditForm } from '@/validators/EditValidator';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { CgClose } from 'react-icons/cg';
import FormTitle from '../formInterface/FormTitle';
import FormName from '../formInterface/FormName';
import FormEmail from '../formInterface/FormEmail';
import SubmitButton from '../formInterface/SubmitButton';

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
      console.log(result.errors);

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

        <form className='relative flex flex-col justify-center items-center gap-2 py-5 px-5 border border-gray-300 rounded w-full mx-2 md:w-1/2 lg:w-1/4 bg-white'
        onSubmit={handleSubmit}
        >

          <FormTitle type='edit' />

          <FormName name={formData.name} isLoading={isLoading} handleChange={handleChange} errors={errors.name} />

          <FormEmail email={formData.email} isLoading={isLoading} handleChange={handleChange} error={errors.email} />

          <SubmitButton apiError={apiError} text={isLoading ? "Updating Profile" : "Save"} isLoading={isLoading} />

        <div 
        onClick={toggleEditPage}
        className={`hover:underline hover:text-[#72383d] transition-all absolute top-2 md:top-3 lg:top-2 cursor-pointer right-2 md:right-3 lg:right-2`}>
          {backButton}
        </div>


        </form>
      </div>
    </div>
  )
}

export default EditProfile