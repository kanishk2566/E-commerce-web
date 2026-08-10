import React from 'react'
import { DisplayCartItem } from '@/types/cart';
import { MdDelete } from 'react-icons/md';
import { useCart } from '@/context/CartContext';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

type CartItemProps = {
  item: DisplayCartItem;
}

const CartItem = ({item}: CartItemProps) => {
  const { addToCart, removeFromCart, decreaseQuantity } = useCart();

  function handleRemoveItem() {
    removeFromCart(item.product.id);
  }

  function handleIncreaseQuantity() {
    addToCart(item.product.id);
  }

  function handleDecreaseQuantity() {
    decreaseQuantity(item.product.id);
  }

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex rounded mx-5'>
        <div className='border border-gray-300 p-2 rounded-l bg-[#D2DCE6] flex justify-center items-center'>
          <Image
          width={400}
          height={400}
          src={item.product.image} 
          alt={item.product.title}
          className='h-28 w-28 object-contain'
          />
        </div>
        <div 
        className='flex justify-start flex-1 items-center gap-5 ml-1 p-3 bg-[#D2DCE6] border border-gray-300 rounded-r relative'>

          <div className='flex flex-col gap-2'>
            <Link href={`/products/${item.product.id}`} className='text-xl font-semibold line-clamp-2 hover:opacity-80 hover:underline'>
              {item.product.title}
            </Link>
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
            <div className='font-bold text-xl text-[#1c0c0c]'>
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
          <button
          type='button'
          onClick={handleRemoveItem}
          className='flex justify-center items-center gap-1 absolute right-2 bottom-2 md:right-2 text-red-600 hover:opacity-90 cursor-pointer hover:bg-red-300 bg-[#b6c9d4] py-1 px-2 rounded transition-all'>
            <MdDelete /> Remove
          </button>
        </div>
      </motion.div>
       
    </>
  )
}

export default CartItem