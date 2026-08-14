"use client"
import { DisplayCartItem } from '@/types/cart';
import FinalSummary from './FinalSummary';
import { Coupon } from '@/types/coupon';
import { useState } from 'react';
import CouponContainer from '../discounts/CouponContainer';
import { setDeliveryMethod as DeliveryMethodService} from '@/services/checkout';
import DeliveryMethodPage from '../deliveryMethod/DeliveryMethodPage';

interface OrderSummaryProps {
  products: DisplayCartItem[],
  coupons: Coupon[],
}

const ProductSummary = ({products, coupons}: OrderSummaryProps) => {
  const [discount, setDiscount] = useState(0);
  const totalPrice = products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const [charges, setCharges] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const method = e.target.value;
    setSelectedMethod(method);
    const result = DeliveryMethodService(method);
    setCharges(result);
  }

  return (
      <div className='lg:grid grid-cols-2 flex flex-col justify-center items-center gap-5 w-full'>

        <div className='w-full h-full flex flex-col gap-5'>
        <CouponContainer coupons={coupons} amount={totalPrice} setDiscount={setDiscount} />
        <DeliveryMethodPage handleChange={handleChange} selectedMethod={selectedMethod} />
      </div>

        <div className='flex flex-col gap-5 justify-start h-full'>
          <div className='text-xl font-bold text-start w-full border-l-5 px-3'>
            Products Summary
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

          <tbody>

            {products.map((item, index) => (

              <tr key={index}>
                
                <td className="lg:px-6 py-1 font-medium max-w-80 line-clamp-1">
                  {item.product.title}
                </td>

                <td className="px-2 py-1 text-right">
                  {item.quantity}
                </td>

                <td className="lg:px-6 py-1 font-bold text-right">
                    ${item.product.price * item.quantity}
                </td>
                
              </tr>
            ))}

          </tbody>

        </table>
        </div>
        <FinalSummary products={products} discount={discount} charges={charges} />
      
        </div>

      </div>
  )
}

export default ProductSummary
