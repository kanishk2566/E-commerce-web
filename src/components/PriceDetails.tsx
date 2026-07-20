import { useCart } from '@/context/CartContext';
import React from 'react'

const PriceDetails = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const roundedPrice = totalPrice.toFixed(2);
  
  // Accordion 
  return (
    <div className='lg:w-3/10 mx-5 flex flex-col gap-2 h-full lg:min-h-screen'>
    
    <div className='flex gap-10 flex-col'>
      <div className=' bg-gray-200 p-5 rounded-2xl w-full overflow-clip'>
        <div className='text-center mb-2 pb-2 text-2xl border-b font-bold border-gray-400'>
          Price Details
        </div>
        <div className='flex flex-col gap-3'>      
          {cart.map((item) => (
            <div
            className='flex justify-between lg:gap-7 border-b border-gray-300'
            key={item.product.id}>
              <p className='w-[80%]'>
                {item.product.title}
                <span className='text-xs ml-1 text-gray-600'>
                  ({item.quantity})
                </span>
              </p>

              <div className='font-semibold'>
                ${((item.product.price) * (item.quantity)).toFixed(2)}
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
    </div>
  )
}

export default PriceDetails