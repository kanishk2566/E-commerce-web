"use client"
import React, { useMemo } from 'react'
import CartCard from './CartCard'
import Navbar from '../navbar/Navbar';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

interface CartPageProps {
  products: Product[];
}
const CartPage = ({products}: CartPageProps) => {
  const { cart, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
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
      <div className='flex w-full pt-5 lg:mt-10 mt-10 mb-10'>
          {!isAuthenticated ? (
          <div className='flex justify-center items-center flex-col w-full h-screen gap-3'>
            <Image
              width={300}
              height={300}
              src={"/warning.png"}
              alt="Warning"
              className='h-28 w-28 object-contain'
              />
            <div className='font-bold'>
              Cannot access cart without login..!!
            </div>
            <Link className='bg-[#401b1b] text-[#f2f2eb] py-1 px-3 rounded font-semibold' href={"/login"}>Login</Link>
          </div>
        ) : (
          <CartCard items={displayCartItem} isLoading={isLoading} />
        )}
      </div>
      
    </div>
  )
}

export default CartPage