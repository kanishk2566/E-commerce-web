import Image from 'next/image';
import React, { useState } from 'react'
import { CiCreditCard1 } from 'react-icons/ci';
import { TbCash } from 'react-icons/tb';
import UPIPaymentMethod from './UpiPaymentMethod';
import CardPaymentMethod from './CardPaymentMethod';
import CODPaymentMethod from './CODPaymentMethod';


const PaymentMethodCard = () => {
  const [paymentMethod, setPaymentmethod] = useState<"card" | "upi" | "cod" | null>(null);

  return (
    <div className='py-2'>
      <div className='text-xl font-bold w-full border-l-5 px-3 col-span-6 mb-5'>
        Payment Method
      </div>

      <div className='border py-4 px-5 rounded border-[#9cabb4] flex flex-col xl:flex-row justify-between items-center gap-2 h-full'>

        <div className={`flex flex-col gap-3 text-xl font-semibold h-full ${paymentMethod !== null ? "w-1/2" : "w-full"}`}>

          <div className='flex justify-start items-center gap-3 border py-1 px-3 rounded border-[#9cabb4] shadow-sm hover:shadow-xl shadow-gray-300 w-full'>
            <input
            type='radio'
            name='payment'
            value='upi'
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentmethod("upi")}
            />
            <label className='flex justify-center items-center gap-2'>
              UPI
              <Image 
              src={"/upi_logo.webp"}
              alt=''
              width={500}
              height={500}
              className='h-7 w-15'
              />
            </label>
          </div>

          <div className='flex justify-start items-center gap-3 border py-1 px-3 rounded border-[#9cabb4] shadow-sm hover:shadow-xl shadow-gray-300 w-full'>
            <input
            type='radio'
            name='payment'
            value='card'
            checked={paymentMethod === "card"}
            onChange={() => setPaymentmethod("card")}
            />
            <label className='flex justify-center items-center gap-2'>
              Card 
              <div className='text-2xl text-blue-700'>
                <CiCreditCard1 />
              </div>
            </label>
          </div>

          <div className='flex justify-start items-center gap-3 border py-1 px-3 rounded border-[#9cabb4] shadow-sm shadow-gray-300 w-full'>
            <input
            type='radio'
            name='payment'
            value='cod'
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentmethod("cod")}
            />
            <label className='flex justify-center items-center gap-2'>
              Cash on Delivery 
              <div className='text-2xl text-green-600'>
                <TbCash />
              </div>
            </label>
          </div>

        </div>

        <div className={`${paymentMethod !== null ? "w-1/2 h-full border py-1 px-3 rounded border-[#9cabb4] shadow-sm hover:shadow-xl shadow-gray-300" : "w-0"} `}>
          {paymentMethod === "upi" && <UPIPaymentMethod />}
          {paymentMethod === "card" && <CardPaymentMethod />}
          {paymentMethod === "cod" && <CODPaymentMethod />}
        </div>

      </div>

    </div>
  )
}

export default PaymentMethodCard