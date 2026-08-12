"use client"
import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import { AddressFormErrors, validateAddressForm } from '@/validators/AddressValidator';
import FormName from '../formInterface/FormName';
import SubmitButton from '../formInterface/SubmitButton';
import Navbar from '../navbar/Navbar';
import { AddressFormData } from '@/types/address';
import { deleteAddress, saveAddress } from '@/services/address';
import AddressList from './AddressList';

const AddressForm = () => {
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
    <div>
      <Navbar />
      <div className='w-full mb-20 flex flex-col gap-2 px-10 mt-15 '>
        <p className="text-xl mb-2 border-l-5 border-[#401b1b] pl-4 font-bold">
          Delivery Address
        </p>

        <div className='lg:flex-row flex flex-col justify-center gap-5'>
          <div className='lg:w-1/3'>
            <AddressList handleDelete={handleDelete} />
          </div>
          
          <form 
    onSubmit={handleSubmit}
    className='lg:grid grid-cols-6 gap-5 border border-[#9cabb4] p-5 rounded h-fit'>

      <div className='text-xl font-bold w-full border-l-5 px-2 col-span-6'>
        Enter Your Address
      </div>

      <div className='col-span-3'>
        <FormName name={addressData.name} isLoading={isLoading} handleChange={handleChange} errors={errors.name} label='Name:' placeholder='Enter name' type='name' />
      </div>

      <div className='col-span-3'>
        <FormName name={addressData.phone} isLoading={isLoading} handleChange={handleChange} errors={errors.phone} label='Phone:' placeholder='Enter phone number' type='phone' />
      </div>

      <div className='flex col-span-2 justify-center items-center gap-2'>
        <div className='flex justify-center items-center mt-3 gap-2'>
          <input 
          name={addressData.title}
          id='Home'
          onChange={(e) => setAddressData({
            ...addressData,
            title: e.target.id
          })}
          type='radio'
          value={addressData.title}
          />
          <label>Home</label>

          <input 
          name={addressData.title}
          id='Work'
          onChange={(e) => setAddressData({
            ...addressData,
            title: e.target.id
          })}
          type='radio'
          value={addressData.title}
          />
          <label>Work</label>
        </div>

        <FormName name={addressData.title} isLoading={isLoading} handleChange={handleChange} errors={errors.title} label='Title:' placeholder='Other' type='title' />
      </div>

      <div className='col-span-4'>
        <FormName name={addressData.addressLine} isLoading={isLoading} handleChange={handleChange} errors={errors.addressLine} label='Address:' placeholder='Enter address' type='addressLine' />
      </div>

      <div className='col-span-2'>
        <FormName name={addressData.city} isLoading={isLoading} handleChange={handleChange} errors={errors.city} label='City:' placeholder='Enter city' type='city' />
      </div>

      <div className='col-span-2'>
        <FormName name={addressData.state} isLoading={isLoading} handleChange={handleChange} errors={errors.state} label='State:' placeholder='Enter state' type='state' />
      </div>

      <div className='col-span-2'>
        <FormName name={addressData.pincode} isLoading={isLoading} handleChange={handleChange} errors={errors.pincode} label='Pincode:' placeholder='Enter pincode' type='pincode' />
      </div>

      <div className='col-span-6 py-5'>
        <SubmitButton isLoading={isLoading} text='Save Address' apiError={apiError} />
      </div>

    </form>
        </div>
      </div>
    </div>
  )
}

export default AddressForm