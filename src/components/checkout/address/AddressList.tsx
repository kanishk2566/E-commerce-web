"use client"
import { useAuth } from '@/context/AuthContext'
import React, { SetStateAction, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { RiBuilding4Fill } from 'react-icons/ri';

interface AddressListPros {
  handleDelete: (addressId: string) => Promise<void>,
  setNewAddress: React.Dispatch<SetStateAction<boolean>>,
  newAddress: boolean,

}

const AddressList = ({handleDelete, newAddress, setNewAddress}: AddressListPros) => {
  const { user } = useAuth();
  const [deleteModal, setDeleteModal] = useState<number | null>(null);
  // const [addressId, setAddressId] = useState("");

  function modalOpen(index: number) {
    setDeleteModal(prev => prev === index ? null : index);
  }

  if(user) {
    return (
      <div className='flex flex-col justify-center items-center gap-3 rounded px-5 py-3 bg-[#d2dce6] w-fit'>
        <div className='text-xl font-bold w-full border-l-5 px-3 '>
          Saved Addresses
        </div>
        <div>
          
          {user.address.length > 0 ? (
            <div>
              <button
              className='border h-fit w-fit flex justify-around mb-3 px-2 rounded-full hover:text-[#ab644b] transition-all'
              onClick={() => setNewAddress(!newAddress)}>
                + Add new Address
              </button>
              <div className={`w-full gap-2 flex flex-col ${newAddress ? "flex-col flex" : `xl:grid ${user.address.length > 2 ? "grid-cols-4" : "grid-cols-2"}`}`}>
              
              {user.address.map((item, index) => (
                <div
                // onClick={() => {setAddressId(item.id); console.log(item.id)}} 
                className='border-2 border-b-5 border-[#9cabb4] rounded py-2 px-2 min-h-20 flex flex-col gap-2 bg-[#f2f2eb]'
                key={index}>
                  <div className='font-semibold flex items-center gap-2'>
                    <div className='text-[#9cabb4]'>
                      {item.title === "Work" && <RiBuilding4Fill />}
                      {item.title === "Home" && <IoMdHome />}
                      {(item.title !== "Work" && item.title !== "Home") && <FaLocationDot />}
                    </div>
                     {item.title}
                  </div>
                  <div>
                    {`${[item.addressLine, item.city, item.state, item.pincode].join(", ")}.`}
                  </div>

                  <button 
                  className='text-[#9cabb4] hover:text-red-500 transition-all cursor-pointer w-fit'
                  onClick={() => modalOpen(index)}>
                    <MdDelete />
                  </button>

                  {deleteModal === index && 
                    <div className='flex border rounded w-fit'>
                      <button
                      className='px-1 border hover:bg-red-200 transition-all cursor-pointer'
                      onClick={() => {handleDelete(item.id); setDeleteModal(null)}}>
                        Delete
                      </button>
                      <button
                      className='px-1 border hover:opacity-80 transition-all cursor-pointer'
                      onClick={() => setDeleteModal(null)}>
                        Cancel
                      </button>
                    </div>
                  }
                </div>
              ))}
            </div>
            </div>
          ) : (
            <div className='font-bold flex flex-col items-center gap-3'>
              You have not saved any addresses...!!
              <button
              className='border h-fit w-fit flex justify-around mb-3 px-2 py-2 rounded-full hover:text-[#ab644b] transition-all'
              onClick={() => setNewAddress(!newAddress)}>
                + Add new Address
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return;
}

export default AddressList