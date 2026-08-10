import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { motion } from 'motion/react';

interface PriceDetailsProps {
  items: DisplayCartItem[];
}
const PriceDetails = ({items}: PriceDetailsProps) => {
  const { totalItem } = useCart();
  const [accordion, setAccordion] = useState(false);

  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const roundedPrice = totalPrice.toFixed(2);
  
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className='lg:w-3/10 mx-5 flex flex-col gap-2 h-full'>
    
    <div className='flex gap-10 flex-col'>
      
      <div className={`bg-[#D2DCE6] p-5 rounded-2xl w-full overflow-clip relative`}>

        <div className='text-center mb-2 pb-2 text-2xl border-b font-bold border-gray-400'>

          Price Details
        </div>

        <div className='flex flex-col gap-3'> 

          <div className='flex justify-between font-bold'>

            <div>
              {totalItem} Products
            </div>

            <div>
              ${roundedPrice}
            </div>

          </div>

          <div className={`transition-all duration-300 ease-in-out ${accordion ? "max-h-500" : "max-h-0"}`}>

            {accordion && (
            <div>
              {items.map((item) => (
                <div
                className='flex justify-between lg:gap-7 border-b border-gray-300'
                key={item.product.id}>

                  <div className='w-[80%] flex items-center'>
                    <p className='line-clamp-1'>{item.product.title}</p>
                    <span className='text-xs ml-1 text-gray-600'>
                      ({item.quantity})
                    </span>
                  </div>

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

        <div className={`text-end flex items-end justify-end absolute right-3 transition-all cursor-pointer ${accordion ? "rotate-180 hover:-translate-y-0.5 bottom-1" : "rotate-0 hover:translate-y-0.5 bottom-2"}`}>
          <button type='button' onClick={() => setAccordion(prev => !prev)}>
            <IoIosArrowDown />
          </button>
        </div>

        </div>

        <button className='w-full rounded-full py-2 text-lg font-semibold bg-[#72383d] text-center cursor-pointer hover:bg-[#401b1b] text-white transition-all'>
          Place Order
        </button>

      </div>

    </motion.div>
  )
}

export default PriceDetails