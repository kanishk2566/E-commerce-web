"use client"
import { useAuth } from '@/context/AuthContext';
import { applyCoupon } from '@/services/coupons';
import { Coupon } from '@/types/coupon'
import React, { SetStateAction, useState } from 'react'
import DiscountCoupons from './DiscountCoupons';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';
import { toast } from 'react-toastify';

interface DiscountCouponsProps {
  coupons: Coupon[];
  amount: number;
  setDiscount: React.Dispatch<SetStateAction<number>>;
}

const CouponContainer = ({coupons, amount, setDiscount}: DiscountCouponsProps) => {
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [couponAccordion, setCouponAccordion] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [applied, setApplied] = useState(false);

  if(!user) return;

  async function handleApply(code: string, amount: number) {
    const result = await applyCoupon(code, amount);
    setApplied(true);
    setDiscount(result);
    setCouponAccordion(false);
    setCouponCode(code);
  }

  function handleRemove() {
    toast.success("Coupon removed");
    setApplied(false);
    setCouponCode("");
  }

  return (
    <div className='w-full flex flex-col items-center gap-5'>

      <div className='font-bold border-l-5 px-3 text-xl w-full'>
        Apply Coupon
      </div>
      
        {applied ? (
          <div className='bg-[#f2f2eb] px-2 border rounded border-[#9cabb4] flex flex-col justify-center items-center gap-3 py-2 w-fit'>
            <div className='flex justify-center items-center'>
              <div className='flex justify-center items-center gap-2 py-1 px-2'>
                Coupon Applied 
                <span className='text-green-600 text-lg'><FaCircleCheck /></span>
              </div>
              <div className='font-mono font-extrabold text-xl bg-[#d2dce6] px-2'>
                {couponCode}
              </div>
            </div>
          <button 
          onClick={() => handleRemove()}
          className='text-red-600 hover:bg-red-200 transition-all flex justify-center items-center gap-1 px-2 py-1 rounded w-full'>
            Remove Coupon<IoMdCloseCircle />
          </button>
          </div>
        ) : (
          <div className='bg-[#f2f2eb] border border-[#9cabb4] rounded px-5 py-3 w-fit'>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-4'>

              <div className={`rounded bg-[#d2dce6] ring-[#9cabb4] ${inputFocus ? "ring-2" : "ring"}`}>
                <input
                className='outline-0 px-2'
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                name='coupenCode'
                placeholder='Coupen code'
                />

                <button 
                className='bg-[#401b1b] py-1 text-[#f2f2eb] px-2 rounded-r hover:bg-[#ab644d] transition-all'
                onClick={() => handleApply(couponCode, amount)}> 
                  Apply
                </button>
              </div>
            
              <button 
              className='bg-[#401b1b] text-[#f2f2eb] font-bold px-2 py-1 rounded-full hover:bg-[#ab644d] transition-all'
              onClick={() => setCouponAccordion(!couponAccordion)}>
                Available Coupons
              </button>

            </div>
            <DiscountCoupons couponAccordion={couponAccordion} coupons={coupons} handleApply={handleApply} amount={amount} setDiscount={setDiscount} />
          </div>
        )}

        
      </div>
    
  )
}

export default CouponContainer