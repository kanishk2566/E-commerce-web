import React from 'react'

const CardPaymentMethod = () => {
  return (
    <div className='flex flex-col gap-1 py-1'>
      <div className='text-xl font-bold w-full border-l-5 px-3 col-span-6 mb-5'>
        Card Details
      </div>

      <div className='my-2 flex flex-col gap-2'>
        <div className='flex justify-center items-center gap-3'>
          <label>Card Number</label>
          <input 
          placeholder='1234 5678 9012 3456'
          className='border rounded border-[#9cabb4] px-2'
          type='text' />
        </div>

        <div className='flex justify-center items-center gap-2'>
          <div className='flex justify-center items-center gap-3'>
          <label>Expiry Date</label>
          <input 
          placeholder='MM/YY'
          className='border rounded border-[#9cabb4] w-1/3 px-2'
          type='text' />
        </div>

        <div className='flex justify-center items-center gap-3'>
          <label>CVV</label>
          <input
          placeholder='***'
          className='border rounded border-[#9cabb4] w-1/3 px-2'
          type='text' />
        </div>
        </div>

        <div className='flex justify-center items-center gap-3'>
          <label>Name(As per the card)</label>
          <input 
          placeholder='Name...'
          className='border rounded border-[#9cabb4] w-8/12'
          type='text' />
        </div>
      </div>

    </div>
  )
}

export default CardPaymentMethod