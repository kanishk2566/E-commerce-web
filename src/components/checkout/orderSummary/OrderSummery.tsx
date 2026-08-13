"use client"
import { DisplayCartItem } from '@/types/cart';
import FinalSummery from './FinalSummery';
import { Coupon } from '@/types/coupon';
import { useState } from 'react';
import CouponContainer from '../discounts/CouponContainer';

interface OrderSummeryProps {
  products: DisplayCartItem[],
  coupons: Coupon[],
}

const OrderSummary = ({products, coupons}: OrderSummeryProps) => {
  const [discount, setDiscount] = useState(0);
    const totalPrice = products.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
      <div className='lg:grid grid-cols-2 flex flex-col justify-center items-center gap-5 w-full'>

        <div className='flex flex-col gap-5 justify-start h-full'>
          <div className='text-xl font-bold text-start w-full border-l-5 px-3'>
            Order Summery
          </div>

          <div className="overflow-x-auto rounded border border-[#9cabb4] px-4 bg-[#f2f2eb]">
          
        <table className="min-w-full text-left divide-y divide-[#9cabb4]">

          <thead className="font-semibold">
            
            <tr>
              <th className="lg:px-6 py-2">Products</th>
              <th className="px-2 py-2 text-right">Qty.</th>
              <th className="lg:px-6 py-2 text-right">Price</th>
            </tr>

          </thead>

          <tbody className=''>

            {products.map((item, index) => (

              <tr key={index}>
                
                <td className="lg:px-6 py-1 font-medium max-w-80 line-clamp-1">
                  {item.product.title}
                </td>

                <td className="px-2 py-1 text-right">
                  {item.quantity}
                </td>

                <td className="lg:px-6 py-1 font-bold text-right">
                    ${item.product.price}
                </td>
                
              </tr>
            ))}

          </tbody>

        </table>
        </div>
        <FinalSummery products={products} discount={discount} />
      
        </div>

      <div className='w-full h-full'>
        <CouponContainer coupons={coupons} amount={totalPrice} setDiscount={setDiscount} />
      </div>
      </div>
  )
}

export default OrderSummary

