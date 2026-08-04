import React from 'react'

interface FormEmailProps {
  email: string,
  error: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isLoading: boolean,
}

const FormEmail = ({email, error, handleChange, isLoading}: FormEmailProps) => {
  return (
      <div className='flex flex-col justify-center items-start text-lg w-full'>

        <label className='text-sm'>Email:</label>
        <input
        className={`rounded outline-0 py-2 px-2 w-full bg-gray-300 focus:ring-2 placeholder:text-sm text-sm ${error ? "ring-red-500" : "ring-[#401b1b]"}`}
        name='email'
        placeholder='Enter email...'
        value={email}
        disabled={isLoading}
        onChange={handleChange} />
        <div className='text-red-600 text-sm'>
          {error}
        </div>
      </div>
  )
}

export default FormEmail