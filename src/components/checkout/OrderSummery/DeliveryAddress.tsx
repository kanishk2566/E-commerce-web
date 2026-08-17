import { Address } from '@/types/address'
import { DeliveryMethod } from '@/types/order'
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoMdHome } from 'react-icons/io'
import { RiBuilding4Fill } from 'react-icons/ri'

interface DeliveryAddressProps {
  address: Address | undefined,
  deliveryMethod: DeliveryMethod,
}

const DeliveryAddress = ({address, deliveryMethod}: DeliveryAddressProps) => {
  return (
    <div>
      {address ? (
        <div>
          <div className='text-xl font-bold text-start w-full border-l-5 px-3 mb-5'>
            Delivery Address
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
          {deliveryMethod === "express" ? (
            <p>Express Delivery</p>
          ): (
            <p> Normal Delivery</p>
          )}
        </div>
    </div>
  )
}

export default DeliveryAddress