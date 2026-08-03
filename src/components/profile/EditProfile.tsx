"use client"
import { useAuth } from '@/context/AuthContext'
import { EditData } from '@/types/user';
import { EditFormErrors, validateEditForm } from '@/validators/EditValidator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';

interface EditProfileProps {
  toggleEdit: () => void
}

const EditProfile = ({toggleEdit}: EditProfileProps) => {
  const { editProfile, isLoading, user } = useAuth();
  const [errors, setErrors] = useState<EditFormErrors>({
    name: "",
    email: "",
  });
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState<EditData>({
    name: user?.name || "",
    email: user?.email || ""
  });

  // abstraction of login, register and edit profile

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
      router.push("/profile");
    }
    catch(apiError) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError.message);
      }
    }
  }

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center bg-black/60 fixed top-0 left-0'>
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>
        <form
        className='relative flex flex-col justify-center items-center gap-2 py-5 px-5 border bg-white border-gray-300 rounded w-full mx-2 md:w-1/2 lg:w-1/4'
        onSubmit={handleSubmit}>

        <div className='text-xl font-semibold flex justify-center items-baseline gap-2 text-[#72383d]'>Edit Profile</div>

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
          <div className='text-red-600 text-sm'>{apiError}</div>

        </div>
        <button
        type='submit'
        disabled={isLoading}
        className={`py-1 px-3 rounded font-semibold text-white mt-2 cursor-pointer bg-[#401b1b]`}>{isLoading ? "Updating Profile" : "Save"}</button>

        <div className='text-sm'>
          <p className='text-[#72383d]'>Already have an account? <Link href={"/login"} className='text-[#401b1b] hover:underline'>Login</Link></p>
        </div>

        <button onClick={toggleEdit} className='hover:underline hover:text-[#72383d] transition-all absolute top-2 right-2 md:top-3 md:right-3 lg:top-2 cursor-pointer lg:right-2'>
          <CgClose />
        </button>
      </form>
      </div>
    </div>
  )
}

export default EditProfile