"use client"
import React, { useEffect, useState } from 'react'
import WishlistGrid from './WishlistGrid';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Wishlist } from '@/types/wishlist';
import { getWishlist } from '@/services/wishlist';
import Navbar from '../navbar/Navbar';

const WishlistPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Wishlist[]>([]);

  useEffect(() => {
    async function getProducts() {
     if(user) {
        const result = await getWishlist(user.id);
        setProducts(result);
      }

      return;
    }
    getProducts();
  })

  return (
    <div>
      <Navbar />
      <div className='mt-10 lg:p-8 p-3 mb-20'>
        
        {user ? (
          <div>
            <p className="text-xl mb-5 border-l-5 border-[#401b1b] pl-4 font-bold">
              Wishlist
            </p>
            <WishlistGrid products={products} />
          </div>
        ) : (
          <div className='flex justify-center items-center flex-col w-full h-screen gap-3'>
            <Image
              width={300}
              height={300}
              src={"/warning.png"}
              alt="Warning"
              className='h-28 w-28 object-contain'
              />
            <div className='font-bold'>
              Cannot access wishlist without login..!!
            </div>
            <Link className='bg-[#401b1b] text-[#f2f2eb] py-1 px-3 rounded font-semibold' href={"/login"}>Login</Link>
          </div> 
        )}
      </div>
    </div>
  )
}

export default WishlistPage