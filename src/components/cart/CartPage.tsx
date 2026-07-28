"use client"
import React from 'react'
import CartCard from './CartCard'
import Navbar from '../navbar/Navbar';

const CartPage = () => {

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center'>
      <Navbar inCart={true} inHome={false} inRegister={false} inLogin={false} inProfile={false}/>
      <div className='flex'>

        <CartCard />
      
      </div>
      
    </div>
  )
}

export default CartPage