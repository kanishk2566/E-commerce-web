"use client"
import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import { AddressFormErrors, validateAddressForm } from '@/validators/AddressValidator';
import { AddressFormData } from '@/types/address';
import { deleteAddress, saveAddress } from '@/services/address';
import AddressList from './AddressList';
import AddressForm from './AddressForm';

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

      <div className='lg:flex-row flex flex-col justify-center gap-5'>
        <div className='lg:w-1/3'>
          <AddressList handleDelete={handleDelete} />
        </div>
        
        <AddressForm handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} addressData={addressData} isLoading={isLoading} setAddressData={setAddressData} apiError={apiError} />
      </div>
    </div>
  )
}

export default AddressPage