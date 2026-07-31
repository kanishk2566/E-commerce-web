import { useCart } from '@/context/CartContext';
import Link from 'next/link'
import React from 'react'
import { TiShoppingCart } from 'react-icons/ti'

const ProfileCartInfo = () => {
    const { totalItem } = useCart();
  return (
    <div className='col-span-2'>
      <div className='flex flex-col justify-center items-center'>
       <div className='font-bold text-xl'>
        Cart Info:
        </div>
        <div className='flex flex-col gap-2 font-normal'>
         <div>
           Total Items: <b> {totalItem}</b>
         </div>

          <div>
            <Link className='bg-[#ab644b] py-1 px-3 rounded-full flex justify-center items-center text-[#f2f2eb] font-semibold' href={"/cart"}>
            Go to cart <TiShoppingCart />
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCartInfo