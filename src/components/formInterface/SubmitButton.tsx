import React from 'react'

interface SubmitButtonProps {
  isLoading: boolean,
  text: string,
  apiError: string
}

const SubmitButton = ({isLoading, text, apiError}: SubmitButtonProps) => {
  return (
    <div>
      <div className='text-red-600 text-sm'>{apiError}</div>
      <button
      type='submit'
      disabled={isLoading}
      className={`py-1 px-3 rounded font-semibold text-white mt-2 cursor-pointer bg-[#401b1b]`}>
        {text}
      </button>
    </div>
  )
}

export default SubmitButton