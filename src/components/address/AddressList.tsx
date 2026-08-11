"use client"
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const AddressList = () => {
  const { user } = useAuth();

  console.log(user?.address);

  return (
    <div>
      {user?.address.map((item, index) => (
        <div key={index}>
          <div>
            {item.addressLine.concat(item.city, item.state, item.pincode)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AddressList