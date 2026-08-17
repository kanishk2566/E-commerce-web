import { useCart } from '@/context/CartContext'
import { Address } from '@/types/address';
import { DisplayCartItem } from '@/types/cart';
import { DeliveryMethod } from '@/types/order';
import React from 'react'
import PricingDetails from './PricingDetails';
import DeliveryAddress from './DeliveryAddress';

interface OrderSummaryProps {
  products: DisplayCartItem[],
  discount: number,
  charges: number,
  address: Address | undefined,
  deliveryMethod: DeliveryMethod,
}

const OrderSummeryPage = ({products, discount, charges, address, deliveryMethod}: OrderSummaryProps) => {
  const {totalItem} = useCart();

  const totalPrice = products.reduce((total, item) => total + (item.quantity * item.product.price), 0);

  const finalTotal = totalPrice + discount + charges;

  return (
    <div>

      <div className='text-xl font-bold text-start w-full border-l-5 px-3 mb-5'>
        Order Summary
      </div>

      <div className='bg-[#d2dce6] rounded p-4 flex flex-col gap-3'>

        <PricingDetails totalItem={totalItem} totalPrice={totalPrice} discount={discount} charges={charges} finalTotal={finalTotal} />

        <div className='border px-2 py-2 rounded flex flex-col gap-2'>
          <DeliveryAddress address={address} deliveryMethod={deliveryMethod}/>
          
        </div>
      </div>
    </div>
  )
}

export default OrderSummeryPage