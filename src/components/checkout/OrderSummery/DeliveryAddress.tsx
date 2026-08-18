import { AddressType } from '@/types/address'
import { DeliveryMethod } from '@/types/order'
import { paymentMethod } from '@/types/payment'
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoMdHome } from 'react-icons/io'
import { RiBuilding4Fill } from 'react-icons/ri'

interface DeliveryAddressProps {
  address: AddressType | undefined,
  deliveryMethod: DeliveryMethod,
  paymentVerified: boolean,
  paymentMethod: paymentMethod,
}

const DeliveryAddress = ({address, deliveryMethod, paymentVerified, paymentMethod}: DeliveryAddressProps) => {
  return (
    <div className='flex flex-col gap-3'>
      {address ? (
        <div>
          <div className='text-xl font-bold text-start w-full border-l-5 px-3 mb-2'>
            Delivery AddressType
          </div>
        <div className='font-bold flex addresss-center gap-2 items-center'>
          <div className='text-[#9cabb4]'>
            {address.title === "Work" && <RiBuilding4Fill />}
            {address.title === "Home" && <IoMdHome />}
            {(address.title !== "Work" && address.title !== "Home") && <FaLocationDot />}
          </div>
          {address.title}
        </div>
        <div>
          {`${[address.addressLine, address.city, address.state, address.pincode].join(", ")}.`}
        </div>
      </div>
      ) : (
        <div>
          Please Select an address..!!
        </div>
      )}

      <div className='font-bold text-lg'>
        <div className='text-xl font-bold text-start w-full border-l-5 px-3 mb-2'>
          Delivery & Payment Method
        </div>
          {deliveryMethod === "express" ? (
            <p>Express Delivery</p>
          ): (
            <p> Normal Delivery</p>
          )}
           {paymentVerified && (
            <div className='font-bold text-lg'>
              {paymentMethod === "card" && (<p>Card</p>)}
              {paymentMethod === "upi" && (<p>UPI</p>)}
              {paymentMethod === "cod" && (<p>Cash on delivery</p>)}
            </div>
          )}
        </div>

         
    </div>
  )
}

export default DeliveryAddress