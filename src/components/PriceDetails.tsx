import { useCart } from '@/context/CartContext';
import React from 'react'

const PriceDetails = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  return (
    <div className='md:w-3/10 mx-5 flex items-start gap-10 flex-col h-full min-h-screen'>
          <div className=' bg-gray-200 p-5 rounded-2xl w-full'>
            <div className='text-center mb-2 pb-2 text-2xl border-b font-bold border-gray-400'>
            Price Details
          </div>
          <div className='flex flex-col gap-3'>
            {cart.map((item) => (
              <div
              className='flex justify-between gap-3'
              key={item.product.id}>
                <div>
                  {item.product.title}
                </div>
                <div>
                  {item.product.price}
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between pt-2 mt-2 font-bold border-t border-gray-400'>
            <div>Total:</div>
            {totalPrice}
          </div>
          </div>
          <div className='w-full rounded-full py-3 font-semibold bg-yellow-500 text-center'>
            Proceed to pay
          </div>
        </div>
  )
}

export default PriceDetails