"use client"
import React from 'react'
import { Wishlist } from '@/types/wishlist';
import WishlistItem from './WishlistItem';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';

interface WishlistGridProps {
  products: Wishlist[];
}

const WishlistGrid = ({products}: WishlistGridProps) => {
  const {wishlist} = useWishlist();
  return (
    <div>
      {wishlist.length === 0 ? (
        <div className='flex flex-col justify-center items-center w-screen h-full pt-20 font-semibold text-2xl'>
        Your Wishlist is Currently Empty!
        <div className='text-sm text-gray-500 font-normal text-center mt-3 mb-3'>
          Looks like you have not added anything to your wishlist.<br /> click on <b>Add items </b> to add items to your wishlist.
        </div>
        <Link className='bg-[#72383d] text-white font-bold py-2 px-4 rounded text-sm' href={"/"}>Add items</Link>
      </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 lg:gap-6'>
          {products.map((product) => (
            <WishlistItem key={product.product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default WishlistGrid