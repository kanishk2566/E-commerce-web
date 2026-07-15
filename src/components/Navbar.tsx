"use client"
import { useCart } from '@/context/CartContext'
import { CartItem } from '@/types/cart';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useCart();
  const cartIcon = <FaShoppingCart />;

  const cartLength = cart.reduce(((total: number, item: CartItem) => {
    return total + item.quantity
  }), 0);

  return (
    <nav className='flex items-center fixed top-0 w-full z-999 justify-between py-4 bg-blue-600 text-white px-8 shadow-md'>

        <div className='text-2xl font-bold'>
          ShopEasy
        </div>

        <div className='flex gap-6'>
          <button className='hover:underline cursor-pointer'>
            Home
          </button>
          <button className='hover:underline cursor-pointer flex justify-center items-center relative text-2xl'>
            {cartIcon}
            {cartLength > 0 && (
              <span className='absolute rounded-full bg-red-500 text-[12px] md:text-[11px] px-1.5 md:px-1.5 -top-2 -right-2.5 md:-top-1.5 md:-right-2.5'>
              {cartLength}
            </span> 
            )}
          </button>
        </div>

    </nav>
  )
}

export default Navbar