/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { CartItemType } from '@/types/cart';
import { MdDelete } from 'react-icons/md';

type CartCardProps = {
  item: CartItemType;
}

const CartItem = ({item}: CartCardProps) => {
  return (
    <>
      <div className='flex flex-col flex-1 gap-4 h-fit pb-5 bg-gray-200 rounded mx-2'>
          <div 
          className='flex justify-start flex-1 items-center gap-5 mx-2 p-3 border-b border-gray-400 relative'
          key={item.product.id}>
            <div className='w-30 border border-gray-300 p-2 rounded bg-white'>
              <img
              src={item.product.image} 
              alt={item.product.title}
              className='h-28 w-28 object-contain'
              />
            </div>

            <div>
              <div>
                {item.product.title}
              </div>
              <div>
                <button>
                  -
                </button>
                {item.quantity}
                <button>
                  +
                </button>
              </div>
              <div>
                {item.product.price}
              </div>
            </div>
            <div className='flex justify-center items-center gap-1 absolute right-2 bottom-2 md:right-2 text-red-500 hover:bg-red-200 cursor-pointer bg-gray-300 py-1 px-2 rounded transition-all'>
              <MdDelete /> Remove
            </div>
          </div>
      </div>
       
    </>
  )
}

export default CartItem