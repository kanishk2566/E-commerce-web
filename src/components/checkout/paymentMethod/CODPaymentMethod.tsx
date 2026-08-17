import React from 'react'

const CODPaymentMethod = () => {
  return (
    <div className='h-full'>
      <div className='text-xl font-bold w-full border-l-5 px-3 col-span-6 mb-5'>
        Cash on Delivery
      </div>

      <div className='flex flex-col gap-2'>
        <div className='font-bold text-xl'>
          Pay the amount when the order is delivered
        </div>
        <div className='font-semibold'>
            No additional payment information required
        </div>
      </div>
    </div>
  )
}

export default CODPaymentMethod