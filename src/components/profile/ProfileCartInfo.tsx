"use client"
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { TiShoppingCart } from 'react-icons/ti'
import { MdKeyboardArrowRight } from "react-icons/md";

interface ProfileCartInfoProps {
  items: DisplayCartItem[];
}

const ProfileCartInfo = ({items}: ProfileCartInfoProps) => {
  const { totalItem } = useCart();
  const [accordion, setAccordion] = useState(false);

  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const roundedPrice = totalPrice.toFixed(2);

  return (
    <div className='w-fit'>
      <div
      className={`relative flex flex-col justify-center items-center bg-[#d2dce6] rounded-lg px-6 transition-all border border-[#9cabb4] ${accordion ? "border-3" : ""} `}>
        <button
        className={`absolute right-1 top-4 transition-all ${accordion ? "rotate-180 hover:-translate-y-0.5" : "rotate-0 hover:translate-y-0.5"}`}
        onClick={() => setAccordion(!accordion)}>
          <IoIosArrowDown />
        </button>
        <div className='flex justify-center items-center gap-6'>
          <div>

            <div className='font-bold text-xl flex justify-center items-center'>
              Cart Info <TiShoppingCart />
            </div>

            <div className='flex w-full justify-center'>
              <button className='flex justify-center items-center gap-2'>Cart Total: 
                <b>${roundedPrice}({totalItem} {totalItem > 1 ? "items" : "item"})</b>
              </button>
            </div>
          </div>
          <div>
            <Link className='bg-[#ab644b] py-2 px-2 rounded-lg flex justify-center items-center w-fit text-[#f2f2eb] font-semibold hover:opacity-80 transition-all' href={"/cart"}>
              <TiShoppingCart /> <MdKeyboardArrowRight />
             </Link>
          </div>
        </div>

       <div className={`transition-all ease-in-out duration-700 ${accordion ? "max-h-500" : "max-h-0"}`}>
          {accordion && (
            <div className='flex flex-col justify-center items-center pt-2 pb-10'>
              {items.map((item, index) => (
                <div className='w-full flex justify-between items-center gap-3' key={item.product.id}>
                  
                  <div className='flex justify-center items-start gap-2'>
                    <div className='font-bold'>
                      {index + 1}.
                    </div>
                      {item.product.title}<div className='font-semibold'>(x{item.quantity})</div>
                  </div>

                  <div className='font-bold'>
                    ${(item.product.price) * (item.quantity)}
                  </div>
                </div>
              ))}
            </div>
        )}
       </div>
      </div>      
    </div>
  )
}

export default ProfileCartInfo