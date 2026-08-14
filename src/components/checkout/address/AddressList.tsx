"use client"
import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { RiBuilding4Fill } from 'react-icons/ri';

interface AddressList {
  handleDelete: (addressId: string) => Promise<void>,
}

const AddressList = ({handleDelete}: AddressList) => {
  const { user } = useAuth();
  const [deleteModal, setDeleteModal] = useState<number | null>(null);

  function modalOpen(index: number) {
    setDeleteModal(prev => prev === index ? null : index);
  }

  if(user) {
    return (
      <div className='flex flex-col justify-center items-center gap-3 border rounded px-5 py-3 bg-[#401b1b] '>
        <div className='text-xl font-bold w-full border-l-5 px-3 text-[#f2f2eb]'>
          Saved Addresses
        </div>
        <div>
          {user.address.length > 0 ? (
            <div className='w-full gap-2 flex flex-col'>
              {user.address.map((item, index) => (
                <div 
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
          ) : (
            <div className='font-bold text-[#f2f2eb]'>
              You have not saved any addresses...!!
            </div>
          )}
        </div>
      </div>
    )
  }

  return;
}

export default AddressList