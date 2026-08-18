"use client";
import { useCart } from '@/context/CartContext';
import React from 'react'

interface FinalSummaryProps {
  discount: number,
  charges: number,
  totalPrice: number,
  finalPrice: number,
}

const FinalSummary = ({discount, charges, totalPrice, finalPrice}: FinalSummaryProps) => {
  const {totalItem} = useCart();

  return (
    <div className='flex flex-col justify-center items-center gap-5'>

      <div className='overflow-x-auto rounded border border-[#9cabb4] px-4 bg-[#f2f2eb] w-full '>
        <table className='min-w-full text-center lg:text-left divide-y divide-[#9cabb4]'>

          <tbody className='font-semibold'>

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Subtotal</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className='lg:px-6 py-1 font-bold'>${totalPrice.toFixed(2)}</td>
            </tr>

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Delivery fees</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className={`lg:px-6 py-1 font-bold`}>+${charges}</td>
            </tr>

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Discount</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className='lg:px-6 py-1 font-bold text-green-600'>-${discount.toFixed(2)}</td>
            </tr>

            <tr>
              <td className='lg:px-6 py-1 font-medium border-t'>Total Items</td>
              <td className='lg:pl-6 py-1 font-medium border-t'>-</td>
              <td className='lg:px-6 py-1 font-bold border-t'>{totalItem}</td>
            </tr>            

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Total</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className='lg:px-6 py-1 font-bold text-lg'>${finalPrice.toFixed(2)}</td>
            </tr>

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default FinalSummary