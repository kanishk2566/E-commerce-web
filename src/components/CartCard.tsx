"use client"
import { useCart } from '@/context/CartContext';
import React from 'react'
import CartItem from './CartItem';
import PriceDetails from './PriceDetails';
import Image from 'next/image';
import Link from 'next/link';

const CartCard = () => {
  const { cart } = useCart();
  const cartItems = cart.map((item) => {return item.product.id});
  const imageURL = "https://img.magnific.com/premium-vector/beautiful-flat-style-shopping-cart-icon-vector-illustration_1253044-73382.jpg?semt=ais_hybrid&w=740&q=80"
  console.log(cartItems);
  return (
    <div className='w-screen flex flex-col'>
    {cartItems.length > 0 ? (
      <div className='flex'>
      <div className='flex-1'>
        {cart.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
      </div>

      <PriceDetails />
    </div> 
    ) : (
      <div className='flex flex-col justify-center items-center w-screen mb-20 gap-3 font-semibold'>
        <Image src={imageURL} alt='Cart is Empty' width={300} height={300} />
        Your Cart is Empty...
        <Link className='bg-blue-600 text-white font-bold py-1 px-3 rounded' href={"/"}>Shop Now</Link>
      </div>
    )}
    </div>   
  )
}

export default CartCard