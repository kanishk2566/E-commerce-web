import React, { ChangeEvent, SetStateAction, SyntheticEvent } from 'react'
import FormName from '../../formInterface/FormName'
import { AddressFormData } from '@/types/address'
import { AddressFormErrors } from '@/validators/AddressValidator'
import SubmitButton from '../../formInterface/SubmitButton'

interface AddressFormProps {
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => void,
  addressData: AddressFormData,
  isLoading: boolean,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  errors: AddressFormErrors,
  setAddressData: React.Dispatch<SetStateAction<AddressFormData>>,
  apiError: string,
}

const AddressForm = ({handleSubmit, addressData, isLoading, handleChange, errors, setAddressData, apiError}: AddressFormProps) => {
  return (
    <form 
    onSubmit={handleSubmit}
    className='lg:grid grid-cols-6 gap-5 border border-[#9cabb4] p-5 rounded h-fit'>

      <div className='text-xl font-bold w-full border-l-5 px-3 col-span-6'>
        Save New Address
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
        <FormName name={addressData.addressLine} isLoading={isLoading} handleChange={handleChange} errors={errors.addressLine} label='AddressType:' placeholder='Enter address' type='addressLine' />
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
     
  )
}

export default AddressForm