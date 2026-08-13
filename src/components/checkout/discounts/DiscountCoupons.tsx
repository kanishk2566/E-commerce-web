"use client"
import { Coupon } from '@/types/coupon'
import React, { SetStateAction } from 'react'
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface DiscountCouponsProps {
  coupons: Coupon[];
  amount: number;
  setDiscount: React.Dispatch<SetStateAction<number>>;
  handleApply: (code: string, amount: number) => Promise<void>;
  couponAccordion: boolean;
}

const DiscountCoupons = ({coupons, amount, handleApply, couponAccordion}: DiscountCouponsProps) => {

  return (
    <div className={`grid lg:grid-cols-3 gap-3 transition-all ease-in-out duration-600 overflow-auto ${couponAccordion ? "max-h-500 mt-5 max-w-full" : "max-h-0 max-w-0"}`}>
      {coupons.map((item) => (
      <div
      className='bg-white border rounded px-4 py-2 w-fit flex flex-col justify-between gap-2 max-w-60'
      key={item.id}>

        <div className='font-mono font-extrabold text-xl flex gap-2'>
          {item.code}
          <button
          onClick={() => {
            navigator.clipboard.writeText(item.code);
            toast("Copied to clipboard");
          }}
          className='text-sm text-[#9cabb4] hover:scale-110'>
            <FaCopy />
          </button>
        </div>

        <div className='font-semibold'>
          Get <b>{item.type === "fixed" && "$"}{item.value}{item.type === "percentage" && "%"} OFF</b> on orders more than ${item.min}
        </div>
        <div className='text-xs text-red-600'>
          {item.min > amount && <p>add items worth {(item.min - amount).toFixed(2)} to apply this coupon</p>}
        </div>
        <button
        disabled={item.min > amount}
        className='bg-[#401b1b] text-[#f2f2eb] text-sm py-0.5 px-2 rounded hover:bg-[#ab644b] transition-all cursor-pointer disabled:cursor-not-allowed disabled:bg-[#401b1b]/60'
        onClick={() => handleApply(item.code, amount)}>
          Apply
        </button>
      </div>

    ))}
    </div>
  )
}

export default DiscountCoupons