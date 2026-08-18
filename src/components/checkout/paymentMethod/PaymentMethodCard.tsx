"use client"
import Image from 'next/image';
import React, { SetStateAction } from 'react'
import { CiCreditCard1 } from 'react-icons/ci';
import { TbCash } from 'react-icons/tb';
import UPIPaymentMethod from './UpiPaymentMethod';
import CardPaymentMethod from './CardPaymentMethod';
import CODPaymentMethod from './CODPaymentMethod';
import { paymentMethod } from '@/types/payment';

interface PaymentMethodCardProps {
  paymentMethod: paymentMethod,
  setPaymentMethod: React.Dispatch<SetStateAction<paymentMethod>>,
  paymentVerified: boolean,
  setPaymentVerified: React.Dispatch<SetStateAction<boolean>>,
}

const PaymentMethodCard = ({paymentMethod, setPaymentMethod, setPaymentVerified, paymentVerified}: PaymentMethodCardProps) => {

  return (
    <div className='py-2'>
      <div className='text-xl font-bold w-full border-l-5 px-3 col-span-6 mb-5'>
        Payment Method
      </div>

      <div className='border py-4 px-5 rounded border-[#9cabb4] flex flex-col xl:flex-row justify-between items-center gap-2 h-full'>

        <div className={`flex flex-col gap-3 text-xl font-semibold h-full ${paymentMethod !== null ? "xl:w-1/2 w-full" : "w-full"}`}>

          <div 
          onClick={() => {setPaymentMethod("upi"); setPaymentVerified(false); console.log(paymentVerified)}}
          className='flex justify-start items-center gap-3 border py-1 px-3 rounded border-[#9cabb4] shadow-sm hover:shadow-lg shadow-gray-300 w-full'>
            <input
            type='radio'
            name='payment'
            value='upi'
            checked={paymentMethod === "upi"}
            onChange={() => {setPaymentMethod("upi"); setPaymentVerified(false); console.log(paymentVerified)}}
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

          <div 
          onClick={() => {setPaymentMethod("card"); setPaymentVerified(false); console.log(paymentVerified)}}
          className='flex justify-start items-center gap-3 border py-1 px-3 rounded border-[#9cabb4] shadow-sm hover:shadow-lg shadow-gray-300 w-full'>
            <input
            type='radio'
            name='payment'
            value='card'
            checked={paymentMethod === "card"}
            onChange={() => {setPaymentMethod("card"); setPaymentVerified(false); console.log(paymentVerified)}}
            />
            <label className='flex justify-center items-center gap-2'>
              Card 
              <div className='text-2xl text-blue-700'>
                <CiCreditCard1 />
              </div>
            </label>
          </div>

          <div 
          onClick={() => {setPaymentMethod("cod"); setPaymentVerified(true)}}
          className='flex justify-start items-center gap-3 border py-1 px-3 rounded border-[#9cabb4] shadow-sm hover:shadow-lg shadow-gray-300 w-full'>
            <input
            type='radio'
            name='payment'
            value='cod'
            checked={paymentMethod === "cod"}
            onChange={() => {setPaymentMethod("cod"); setPaymentVerified(true); console.log(paymentVerified)}}
            />
            <label className='flex justify-center items-center gap-2'>
              Cash on Delivery 
              <div className='text-2xl text-green-600'>
                <TbCash />
              </div>
            </label>
          </div>

        </div>

        <div className={`${paymentMethod !== null ? "xl:w-1/2 h-full border py-1 px-3 w-full rounded border-[#9cabb4] shadow-sm" : "w-0"} transition-all `}>
          {paymentMethod === "upi" && <UPIPaymentMethod setPaymentVerified={setPaymentVerified} />}
          {paymentMethod === "card" && <CardPaymentMethod setPaymentVerified={setPaymentVerified} />}
          {paymentMethod === "cod" && <CODPaymentMethod />}
        </div>

      </div>

    </div>
  )
}

export default PaymentMethodCard