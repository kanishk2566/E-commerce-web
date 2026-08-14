import React from 'react'
import { FaShippingFast } from 'react-icons/fa'

interface DeliveryMethodPageProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  selectedMethod: string,
}

const DeliveryMethodPage = ({handleChange, selectedMethod}: DeliveryMethodPageProps) => {
  return (

    <div className='flex flex-col gap-5'>

      <div className='text-xl font-bold text-start w-full border-l-5 px-3'>
        Delivery Methods
      </div>

      <div className={`${selectedMethod === "express" ? "ring-2 ring-[#401b1b]" : "ring ring-[#9cabb4]"} rounded p-2 flex justify-between items-center`}>
        <div>
          <div className='flex gap-3 text-xl font-semibold'>
            <input
            type='radio'
            onChange={handleChange}
            value="express"
            name="delivery"
            />
            <label className='flex items-center justify-start gap-1'>
              Express Delivery <FaShippingFast />
            </label>
          </div>
          <div>
            Delivery in <b>5-7 days</b>
          </div>
          </div>
          <div className='font-bold'>
            $99/-
          </div>
      </div>

      <div className={`${selectedMethod === "normal" ? "ring-2 ring-[#401b1b]" : "ring ring-[#9cabb4]"} rounded p-2 flex justify-between items-center`}>
        <div>
          <div className='flex gap-3 text-xl font-semibold'>
            <input
            type='radio'
            onChange={handleChange}
            value="normal"
            name="delivery"
            />
            <label>
              Normal Delivery
            </label>
          </div>
          <div>
            Delivery in <b>10-12 days</b>
          </div>
        </div>
        <div className='font-bold'>
          $0/-
        </div>
      </div>
    </div>

  )
}

export default DeliveryMethodPage