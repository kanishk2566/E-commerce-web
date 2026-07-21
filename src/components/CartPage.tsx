"use client"
import React from 'react'
import CartCard from './CartCard'
import Navbar from './Navbar';

const CartPage = () => {

  return (
    <div>
      <Navbar inCart={true} inHome={false} inRegister={false}/>
      <div className='mt-20 flex'>

        <CartCard />
      
      </div>
      
    </div>
  )
}

export default CartPage