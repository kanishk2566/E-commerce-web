import React from 'react'

interface PricingDetailsProps {
  totalPrice: number,
  charges: number,
  discount: number,
  finalTotal: number,
  totalItem: number
}

const PricingDetails = ({totalPrice, totalItem, charges, discount, finalTotal}: PricingDetailsProps) => {
  return (
    <div className='border px-2 py-2 rounded'>
      <div className='text-xl font-bold text-start w-full border-l-5 px-3 mb-5'>
        Pricing Details
      </div>
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
            <td className='lg:px-6 py-1 font-bold text-green-600'>-${discount.toFixed(2)}</td>
          </tr>

          <tr>
            <td className='lg:px-6 py-1 font-medium border-t'>Total Items</td>
            <td className='lg:pl-6 py-1 font-medium border-t'>-</td>
            <td className='lg:px-6 py-1 font-bold border-t'>{totalItem}</td>
          </tr>            

          <tr>
            <td className='lg:px-6 py-1 font-medium'>Total</td>
            <td className='lg:pl-6 py-1 font-medium'>-</td>
            <td className='lg:px-6 py-1 font-bold text-lg'>${finalTotal.toFixed(2)}</td>
          </tr>
        </tbody>

      </table>
    </div>
  )
}

export default PricingDetails