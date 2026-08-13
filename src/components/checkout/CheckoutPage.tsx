"use client"
import React, { useMemo } from 'react'
import AddressPage from './address/AddressPage'
import OrderSummary from './orderSummary/OrderSummery'
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';
import { Product } from '@/types/product';
import Navbar from '../navbar/Navbar';

interface CheckoutPageProps {
  products: Product[];
}

const CheckoutPage = ({products}: CheckoutPageProps) => {
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
    <div>
      <Navbar />
      <div className='mt-15 lg:px-10 px-2 flex flex-col gap-5'>
        <OrderSummary products={displayCartItem} />
      <AddressPage />
      </div>
    </div>
  )
}

export default CheckoutPage