import { useCart } from '@/context/CartContext'
import { AddressType } from '@/types/address';
import { DisplayCartItem } from '@/types/cart';
import { DeliveryMethod } from '@/types/order';
import React from 'react'
import PricingDetails from './PricingDetails';
import DeliveryAddress from './DeliveryAddress';
import { paymentMethod } from '@/types/payment';

interface OrderSummaryProps {
  products: DisplayCartItem[],
  discount: number,
  charges: number,
  address: AddressType | undefined,
  deliveryMethod: DeliveryMethod,
  paymentMethod: paymentMethod,
  paymentVerified: boolean,
  handleConfirmOrder: () => Promise<void>, 
}

const OrderSummeryPage = ({products, discount, charges, address, deliveryMethod, paymentMethod, paymentVerified, handleConfirmOrder}: OrderSummaryProps) => {
  const {totalItem} = useCart();

  const totalPrice = products.reduce((total, item) => total + (item.quantity * item.product.price), 0);

  const finalTotal = totalPrice + discount + charges;

  return (
    <div>
      <div className='text-xl font-bold text-start w-full border-l-5 px-3 mb-5'>
        Order Summary
      </div>

      <div className='xl:grid grid-cols-2 flex flex-col gap-3'>
        <div className='bg-[#d2dce6] rounded xl:p-4 flex flex-col gap-3'>

          <PricingDetails totalItem={totalItem} totalPrice={totalPrice} discount={discount} charges={charges} finalTotal={finalTotal} />

        </div>

        <div className='flex flex-col gap-4'>
          <div className='border px-2 py-2 rounded flex flex-col gap-2'>
            <DeliveryAddress address={address} deliveryMethod={deliveryMethod} paymentMethod={paymentMethod} paymentVerified={paymentVerified}/>
          </div>

          <div className='px-10'>
            <button 
            onClick={() => handleConfirmOrder()}
            className='bg-[#72383d] text-[#f2f2eb] font-semibold text-xl w-full py-2 rounded-full cursor-pointer hover:bg-[#401b1b] transition-all'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummeryPage