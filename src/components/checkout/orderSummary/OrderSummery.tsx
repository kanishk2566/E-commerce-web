"use client"
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';

interface OrderSummeryProps {
  products: DisplayCartItem[],
}

const OrderSummary = ({products}: OrderSummeryProps) => {
  const {totalItem} = useCart();
  const totalPrice = products.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
      <div className='flex flex-col justify-center items-center gap-5'>
        <div className='text-xl font-bold text-start w-full border-l-5 px-3'>
          Order Summery
        </div>

        <div className="overflow-x-auto rounded border border-[#9cabb4] px-4 bg-[#d2dce6]">
        <table className="min-w-full text-left divide-y divide-[#9cabb4]">
          <thead className="font-semibold">
            <tr>
              <th className="lg:px-6 py-2">Products</th>
              <th className="px-2 py-2 text-right">Qty.</th>
              <th className="lg:px-6 py-2 text-right">Price</th>
            </tr>
          </thead>

          <tbody className=''>
            {products.map((item, index) => (
              <tr key={index} className="">
                <td className="lg:px-6 py-1 font-medium">
                  {item.product.title}
                </td>
                <td className="px-2 py-1 text-right">
                  {item.quantity}
                </td>
                <td className="lg:px-6 py-1 font-bold text-right">
                    ${item.product.price}
                </td>
              </tr>
            ))}
            <tr>
              <td className=' py-2 lg:px-6 font-bold border-t border-t-[#9cabb4]'>Total: </td>
              <td className=' py-2 font-semibold border-t text-right border-t-[#9cabb4]'>{totalItem}</td>
              <td className='lg:px-6 py-2 font-bold border-t border-t-[#9cabb4]'>$ {totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default OrderSummary

