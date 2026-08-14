"use client"
import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import { AddressFormErrors, validateAddressForm } from '@/validators/AddressValidator';

import { deleteAddress, saveAddress } from '@/services/address';
import AddressList from './AddressList';
import AddressForm from './AddressForm';
import { AddressFormData } from '@/types/address';

const AddressPage = () => {
  const { user, isLoading, updateUser } = useAuth();
  const [addressData, setAddressData] = useState<AddressFormData>({
    name: user?.name || "",
    addressLine: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    title: "",
  })
  const [errors, setErrors] = useState<AddressFormErrors>({
    name: "",
    addressLine: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    title: "",
  });
  const [apiError, setApiError] = useState("");
  const [newAddress, setNewAddress] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddressData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setApiError("");
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if(user) {
      const result = validateAddressForm(addressData);

      setErrors(result.errors);

      if(!result.isValid) return;
      const updatedAddress = await saveAddress(user.id, addressData);

        updateUser({
        address: [...updatedAddress]
      });
    }
    }
    catch(error) {
      if(error instanceof Error) {
        setApiError(error.message);
        console.log(error.message);
      }
    }
  }

  async function handleDelete(addressId: string) {
    try {
      if(user) {
        const updatedAddress = await deleteAddress(user.id, addressId);
        updateUser({
          address: [...updatedAddress]
        })
      }
    }
    catch(error) {
      if(error instanceof Error) {
        setApiError(error.message);
        console.log(error.message);
      }
    }
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <p className="text-xl mb-2 border-l-5 border-[#401b1b] px-3 font-bold">
        Delivery Address
      </p>

      <div className={`xl:flex justify-center gap-5 h-fit`}>
        <div className={`max-h-100 h-fit overflow-auto scrollbar-thin scrollbar-thumb-[#9cabb4] rounded scrollbar-track-[#f2f2eb] transition-all duration-300 ${newAddress ? "lg:w-1/3" : "w-full"}`}>
          <AddressList handleDelete={handleDelete} setNewAddress={setNewAddress} newAddress={newAddress} />
        </div>
        
          <div className={`${newAddress ? "max-w-600" : "max-w-0 max-h-0"} overflow-auto transition-all ease-in-out duration-300`}>
            <AddressForm handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} addressData={addressData} isLoading={isLoading} setAddressData={setAddressData} apiError={apiError} />
          </div>
          
      </div>
    </div>
  )
}

export default AddressPage