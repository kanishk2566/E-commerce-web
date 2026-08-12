"use client"
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';
import { Product } from '@/types/product';
import React, { useMemo } from 'react'

interface OrderSummeryProps {
  products: Product[],
}

const OrderSummary = ({products}: OrderSummeryProps) => {
  const {cart} = useCart();

  const displayCartItem: DisplayCartItem[] = useMemo(() => {
    const productMap = new Map(
      products?.map((product) => [product.id, product])
    );
    return cart.flatMap((cartItem) => {
      const product = productMap.get(cartItem.productId);

      if(!product) {
        return [];
      }

      return [{
        product,
        quantity: cartItem.quantity,
      }];
    });
  }, [cart, products]);

  return (
    <div className='w-fit'>
      <div className={`transition-all ease-in-out duration-700 `}>
            <div className='flex flex-col justify-center items-center pt-2 pb-10'>
              {displayCartItem.map((item, index) => (
                <div className='w-full flex justify-between items-center gap-3' key={item.product.id}>
                  
                  <div className='flex justify-center items-start gap-2'>
                    <div className='font-bold'>
                      {index + 1}.
                    </div>
                      {item.product.title}<div className='font-semibold'>(x{item.quantity})</div>
                  </div>

                  <div className='font-bold'>
                    ${(item.product.price) * (item.quantity)}
                  </div>
                </div>
              ))}
            </div>
       </div>

    </div>
  )
}

export default OrderSummary