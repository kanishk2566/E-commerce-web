"use client"
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';
import Link from 'next/link'
import React from 'react'
import { TiShoppingCart } from 'react-icons/ti'
import { MdKeyboardArrowRight } from "react-icons/md";

interface ProfileCartInfoProps {
  items: DisplayCartItem[];
}

const ProfileCartInfo = ({items}: ProfileCartInfoProps) => {
  const { totalItem } = useCart();

  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const roundedPrice = totalPrice.toFixed(2);

  return (
    <div className='w-full flex justify-center items-start h-full lg:order-4 col-span-2 lg:col-span-1'>
      <div
      className={`relative flex flex-col w-fit lg:w-full justify-center items-center rounded-lg px-6 transition-all `}>

        <div className='flex flex-col justify-center items-center gap-6'>
          <div>

            <div className='font-bold text-xl flex justify-center items-center py-3'>
              Cart Info <TiShoppingCart />
            </div>

            <div className='flex flex-col w-full justify-center'>
              <div className='flex justify-center items-center gap-2'>Total Item: 
                <b>{totalItem} {totalItem > 1 ? "items" : "item"}</b>
              </div>

              <div className='flex justify-center items-center gap-2'>Cart Total: 
                <b>${roundedPrice}</b>
              </div>
              
            </div>
          </div>
          <div className='w-full flex justify-center'>
            <Link className='bg-[#ab644b] lg:py-2 py-1 px-2 lg:gap-2 rounded-lg flex justify-center items-center w-fit text-[#f2f2eb] font-semibold hover:opacity-80 transition-all' href={"/cart"}>
             View Cart <TiShoppingCart /> <MdKeyboardArrowRight />
             </Link>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default ProfileCartInfo