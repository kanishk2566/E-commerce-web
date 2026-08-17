import { useCart } from '@/context/CartContext'
import { DisplayCartItem } from '@/types/cart';
import React from 'react'

interface OrderSummaryProps {
  products: DisplayCartItem[],
  discount: number,
  charges: number,
}

const OrderSummeryPage = ({products, discount, charges}: OrderSummaryProps) => {
  const {totalItem} = useCart();

  const totalPrice = products.reduce((total, item) => total + (item.quantity * item.product.price), 0);

  const finalTotal = totalPrice + discount + charges;

  return (
    <div>

      <div className='text-xl font-bold text-start w-full border-l-5 px-3 mb-5'>
        Order Summary
      </div>

      <div className='bg-[#d2dce6] rounded'>
        <table className='min-w-full text-center lg:text-left divide-y divide-[#9cabb4]'>

          <tbody className='font-semibold'>

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Subtotal</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className='lg:px-6 py-1 font-bold'>${totalPrice.toFixed(2)}</td>
            </tr>

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Delivery fees</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className={`lg:px-6 py-1 font-bold`}>+${charges}</td>
            </tr>

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Discount</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className='lg:px-6 py-1 font-bold text-green-600'>-${discount}</td>
            </tr>

            <tr>
              <td className='lg:px-6 py-1 font-medium border-t'>Total Items</td>
              <td className='lg:pl-6 py-1 font-medium border-t'>-</td>
              <td className='lg:px-6 py-1 font-bold border-t'>{totalItem}</td>
            </tr>            

            <tr>
              <td className='lg:px-6 py-1 font-medium'>Total</td>
              <td className='lg:pl-6 py-1 font-medium'>-</td>
              <td className='lg:px-6 py-1 font-extrabold'>${finalTotal.toFixed(2)}</td>
            </tr>

          </tbody>

        </table>

        <div>
         
        </div>
      </div>
    </div>
  )
}

export default OrderSummeryPage