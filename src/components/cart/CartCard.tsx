"use client"
import { useCart } from '@/context/CartContext';
import React from 'react'
import CartItem from './CartItem';
import PriceDetails from './PriceDetails';
import Image from 'next/image';
import Link from 'next/link';
import { RxCrossCircled } from 'react-icons/rx';
import { DisplayCartItem } from '@/types/cart';

interface CartCardProps {
  items: DisplayCartItem[],
  isLoading: boolean,
}
const CartCard = ({items, isLoading}: CartCardProps) => {
  const { clearCart } = useCart();

  function handleClearCart() {
    clearCart();
  }

  return (
    <div className='flex flex-col h-full w-full'>
      
    {isLoading ? (
      <div className='w-full h-screen fixed top-0 left-0 flex justify-center items-center font-bold bg-white opacity-50'>
        Loading...
      </div>
    ) : (
      <div>
        {items.length > 0 ? (
      <div className='flex flex-col gap-4 h-fit'>
        <div className='ml-5'>
        <button
        type='button'
        className='hover:text-red-500 border border-red-600 hover:border-red-500 flex justify-center items-center w-fit gap-2 py-1 px-2 text-red-600 transition-all cursor-pointer font-semibold rounded'
        onClick={handleClearCart}>
          <RxCrossCircled />Clear your cart
        </button>
      </div>
        <div className='flex flex-col md:flex-row gap-3 mb-5'>
        
      <div className='flex-1 flex flex-col gap-5'>
        {items.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
      </div>

      <PriceDetails items={items} />
    </div>
      </div>
    ) : (
      <div className='flex flex-col justify-center items-center w-screen h-full pt-20 font-semibold text-2xl'>
        <Image 
        src={"/carts.png"}
        alt='Empty Cart'
        width={150}
        height={150}
        />
        Your Cart is Currently Empty!
        <div className='text-sm text-gray-500 font-normal text-center mt-3 mb-3'>
          Looks like you have not added anything to your cart.<br /> click on <b>Shop Now </b> to add items.
        </div>
        <Link className='bg-[#72383d] text-white font-bold py-2 px-4 rounded text-sm' href={"/"}>Shop Now</Link>
      </div>
    )}
      </div>
    )}
    </div>   
  )
}

export default CartCard

