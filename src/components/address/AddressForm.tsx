"use client"
import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import { AddressFormErrors, validateAddressForm } from '@/validators/AddressValidator';
import FormName from '../formInterface/FormName';
import SubmitButton from '../formInterface/SubmitButton';
import Navbar from '../navbar/Navbar';
import { Address } from '@/types/address';
import { saveAddress } from '@/services/address';
import AddressList from './AddressList';

const AddressForm = () => {
  const { user, isLoading } = useAuth();
  const [addressData, setAddressData] = useState<Address>({
    name: user?.name || "",
    addressLine: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [errors, setErrors] = useState<AddressFormErrors>({
    name: "",
    addressLine: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
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
      await saveAddress(user.id, addressData);
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
    <div>
      <Navbar />
      <div className='px-10 flex flex-col gap-5'>
      <p className="text-xl mb-5 border-l-5 border-[#401b1b] pl-4 font-bold">
        Delivery Address
      </p>
      <div>
        <AddressList />
      </div>

      <form 
      onSubmit={handleSubmit}
      className='lg:grid grid-cols-2 gap-2 gap-x-10'>
        <div>
          <FormName name={addressData.name} isLoading={isLoading} handleChange={handleChange} errors={errors.name} label='Name:' placeholder='Enter name:' type='name' />
        </div>

        <div>
          <FormName name={addressData.phone} isLoading={isLoading} handleChange={handleChange} errors={errors.phone} label='Phone:' placeholder='Enter phone number:' type='phone' />
        </div>

        <div>
          <FormName name={addressData.addressLine} isLoading={isLoading} handleChange={handleChange} errors={errors.addressLine} label='Address:' placeholder='Enter address:' type='addressLine' />
        </div>

        <div>
          <FormName name={addressData.city} isLoading={isLoading} handleChange={handleChange} errors={errors.city} label='City:' placeholder='Enter city:' type='city' />
        </div>

        <div>
          <FormName name={addressData.state} isLoading={isLoading} handleChange={handleChange} errors={errors.state} label='State:' placeholder='Enter state:' type='state' />
        </div>

        <div>
          <FormName name={addressData.pincode} isLoading={isLoading} handleChange={handleChange} errors={errors.pincode} label='Pincode:' placeholder='Enter pincode:' type='pincode' />
        </div>

        <div className='col-span-2'>
          <SubmitButton isLoading={isLoading} text='Save Address' apiError={apiError} />
        </div>

      </form>
    </div>
    </div>
  )
}

export default AddressForm