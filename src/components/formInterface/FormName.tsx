
import React from 'react'

interface FormNameProps {
  name: string,
  isLoading: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: string,
}

const FormName = ({name, isLoading, handleChange, errors}: FormNameProps) => {
  

  return (
      <div className='flex flex-col justify-center items-start text-lg w-full'>

            <label className='text-sm'>Name:</label>
            <input
            className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${errors ? "ring-red-500" : "ring-[#401b1b]"}`}
            name='name'
            placeholder='Enter name...'
            value={name}
            disabled={isLoading}
            onChange={handleChange} />
            <div className='text-red-600 text-sm'>
              {errors}
            </div>

          </div>
  )
}

export default FormName