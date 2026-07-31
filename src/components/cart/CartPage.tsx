"use client"
import React, { useMemo } from 'react'
import CartCard from './CartCard'
import Navbar from '../navbar/Navbar';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';

interface CartPageProps {
  products: Product[];
}
const CartPage = ({products}: CartPageProps) => {
  const { cart, isLoading } = useCart();

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
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center overflow-x-hidden'>
      <Navbar />
      <div className='flex w-full pt-5'>

        <CartCard items={displayCartItem} isLoading={isLoading} />
      
      </div>
      
    </div>
  )
}

export default CartPage