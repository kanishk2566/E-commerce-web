import { UPIPayment } from '@/types/payment'
import { UPIDetalsErrors, validateUPIDetails } from '@/validators/PaymentValidator'
import React, { SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

interface UPIPaymentMethodProps {
  setPaymentVerified: React.Dispatch<SetStateAction<boolean>>,
}

const UPIPaymentMethod = ({setPaymentVerified}: UPIPaymentMethodProps) => {
  const [UPIDetails, setUPIDetails] = useState<UPIPayment>({
    UPIID: "",
  });
  const [errors, setErrors] = useState<UPIDetalsErrors>({
    UPIID: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUPIDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
    e.preventDefault();

    const result = validateUPIDetails(UPIDetails);
    setErrors(result.errors);
    if(!result.isValid) return;

    toast.success("UPI Id Verified");
    setPaymentVerified(true);
  }

  return (
    <div>
      <div className='text-xl font-bold w-full border-l-5 px-3 col-span-6 mb-5'>
        UPI Details
      </div>

      <form
      onSubmit={handleSubmit}
      className='my-2 flex flex-col gap-5'
      >
        <div className='flex justify-center items-center gap-3'>
          <label>UPI Id</label>
          <input
          name='UPIID'
          onChange={handleChange}
          value={UPIDetails.UPIID}
          placeholder='example@upi'
          className='border rounded border-[#9cabb4] px-2'
          type='text' />
          <div className='text-sm text-red-500'>
            {errors.UPIID}
          </div>
        </div>

        <div className='flex justify-center'>
          <button 
          className='bg-[#72383d] w-fit py-1 px-3 text-[#f2f2eb] rounded'
          type='submit'>
            Verify
          </button>
        </div>
      </form>
    </div>
  )
}

export default UPIPaymentMethod