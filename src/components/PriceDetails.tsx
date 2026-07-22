import { useCart } from '@/context/CartContext';
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

const PriceDetails = () => {
  const { cart } = useCart();
  const [accordion, setAccordion] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const roundedPrice = totalPrice.toFixed(2);

  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div className='lg:w-3/10 mx-5 flex flex-col gap-2 h-full lg:min-h-screen'>
    
    <div className='flex gap-10 flex-col'>
      
      <div className={`bg-gray-200 p-5 rounded-2xl w-full overflow-clip relative`}>

        <div className='text-center mb-2 pb-2 text-2xl border-b font-bold border-gray-400'>

          Price Details
        </div>

        <div className='flex flex-col gap-3'> 

          <div className='flex justify-between font-bold'>

            <div>
              {totalItem} Products
            </div>

            <div>
              {totalPrice}
            </div>

          </div>

          <div className={`transition-all duration-700 ${accordion ? "h-full" : "h-0"}`}>

            {accordion && (
            <div>
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

              <div className='flex justify-between pt-2 mt-2 font-bold border-t border-gray-400'>
                <div>Total:</div>
                $ {roundedPrice}
              </div>
            </div>
          )}
          </div>

        </div>

        <div className={`text-end flex items-end justify-end absolute bottom-1 right-3 transition-all ${accordion ? "rotate-180" : "rotate-0"}`}>
          <div onClick={() => {setAccordion(!accordion); console.log(accordion)}}>
            <IoIosArrowDown />
          </div>
        </div>

        </div>

        <button className='w-full rounded-full py-2 text-lg font-semibold bg-yellow-500 text-center cursor-pointer hover:bg-yellow-400 transition-all'>
          Place Order
        </button>

      </div>

    </div>
  )
}

export default PriceDetails