"use client"
import { useCart } from '@/context/CartContext'
import Link from 'next/link';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  const cartIcon = <FaShoppingCart />;
  const homeIcon = <IoMdHome />;
  const { cart } = useCart();

  console.log(cart);

  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className='flex items-center fixed top-0 w-full z-999 justify-between py-4 bg-blue-600 text-white px-8 shadow-md'>

        <div className='text-2xl font-bold'>
          ShopEasy
        </div>

        <div className='flex justify-center items-center gap-6'>
          <Link href={"/"} className='hover:underline cursor-pointer text-2xl flex justify-center items-center gap-1'>
            {homeIcon}
          </Link>
          <Link href={"/cart"} className='hover:underline cursor-pointer flex justify-center items-center relative text-2xl'>
            {cartIcon}
            {totalItem > 0 && (
              <span className='absolute rounded-full bg-red-500 text-[12px] md:text-[11px] px-1.5 md:px-1.5 transition-transform -top-2 -right-2.5 md:-top-1.5 md:-right-2.5'>
              {totalItem}
            </span> 
            )}
          </Link>
        </div>

    </nav>
  )
}

export default Navbar