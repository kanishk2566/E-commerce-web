/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import Navbar from './Navbar'
import { useCart } from '@/context/CartContext'
import { MdDelete } from "react-icons/md";

const CartCard = () => {
  const { cart } = useCart();
  // const { dispatch } = useCart();
  const cartList = cart.map((item) => {
    return item.product.title
  });

  // const itemQuantity = () => {
  //   const increase = cart.reduce((total, item) => total + item.quantity, 0);
  //   console.log(increase);
  //   return increase;
  // }

  console.log(cartList);
  return (
    <>
    <Navbar />
    <div>
      <div>
        {cart.map((item) => (
          <div 
          className='flex justify-start items-center'
          key={item.product.id}>
            <div>
              <img
              src={item.product.image} 
              alt={item.product.title}
              className='h-28 w-full object-contain'
              />
            </div>

            <div>
              <div>
                {item.product.title}
              </div>
              <div>
                <button>
                  -
                </button>
                {item.quantity}
                <button>
                  +
                </button>
              </div>
              <div>
                {item.product.price}
              </div>
            </div>
            <div>
              <MdDelete />
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default CartCard