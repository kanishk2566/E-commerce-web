/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { CartItemType } from '@/types/cart';
import { MdDelete } from 'react-icons/md';
import { useCart } from '@/context/CartContext';

type CartCardProps = {
  item: CartItemType;
}

const CartItem = ({item}: CartCardProps) => {
  const { dispatch } = useCart();

  function handleRemoveItem() {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item.product,
    });
  }

  function handleIncreaseQuantity() {
    dispatch({
      type: "ADD_TO_CART",
      payload: item.product,
    })
  }

  function handleDecreaseQuantity() {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: item.product,
    })
  }

  return (
    <>
      <div className='flex flex-1 h-fit pb-4 rounded ml-5'>
        <div className='w-30 border border-gray-300 p-2 rounded-l bg-gray-200'>
              <img
              src={item.product.image} 
              alt={item.product.title}
              className='h-28 w-28 object-contain'
              />
            </div>
          <div 
          className='flex justify-start flex-1 items-center gap-5 mr-2 ml-1 p-3 bg-gray-200 border border-gray-300 rounded-r relative'>

            <div className='flex flex-col gap-2'>
              <div className='text-xl font-semibold'>
                {item.product.title}
              </div>
              <div className='w-fit flex justify-center items-center border border-gray-400 rounded'>
                <button
                onClick={handleDecreaseQuantity}
                className='border-r rounded-l border-gray-400 w-7 text-xl text-center bg-white cursor-pointer'>
                  -
                </button>
                <div className='border-gray-400 px-2 bg-white w-7 text-center'>
                  {item.quantity}
                </div>
                <button
                onClick={handleIncreaseQuantity}
                className='border-l rounded-r border-gray-400 w-7 text-xl text-center bg-white cursor-pointer'>
                  +
                </button>
              </div>
              <div className='font-bold text-green-600'>
                ${item.product.price}
              </div>
            </div>
            <div 
            onClick={handleRemoveItem}
            className='flex justify-center items-center gap-1 absolute right-2 bottom-2 md:right-2 text-red-500 hover:bg-red-200 cursor-pointer bg-gray-300 py-1 px-2 rounded transition-all'>
              <MdDelete /> Remove
            </div>
          </div>
      </div>
       
    </>
  )
}

export default CartItem