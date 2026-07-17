import { useCart } from '@/context/CartContext';
import React from 'react'

const PriceDetails = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const roundedPrice = totalPrice.toFixed(2);
  // Accordion 
  return (
    <div className='md:w-3/10 mx-5 flex items-end gap-10 flex-col h-full md:min-h-screen'>
          <div className=' bg-gray-200 p-5 rounded-2xl w-full'>
            <div className='text-center mb-2 pb-2 text-2xl border-b font-bold border-gray-400'>
            Price Details
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between gap-2 font-semibold border-b border-gray-300 pb-2'>
              <div className='w-[80%]'>Products:</div>
              <div className='flex justify-between w-[30%]'>
                <div >Qty:</div>
              <div>Price:</div>
              </div>
            </div>
            {cart.map((item) => (
              <div
              className='flex justify-between gap-2'
              key={item.product.id}>
                <div className='w-[80%]'>
                  {item.product.title}
                </div>
                <div className='flex justify-between w-[30%]'>
                  <div className='flex'>
                    x{item.quantity}
                  </div>
                  <div>
                    ${(item.product.price) * (item.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between pt-2 mt-2 font-bold border-t border-gray-400'>
            <div>Total:</div>
            $ {roundedPrice}
          </div>
          </div>
          <div className='w-full rounded-full py-2 text-lg font-semibold bg-yellow-500 text-center'>
            Place Order
          </div>
        </div>
  )
}

export default PriceDetails