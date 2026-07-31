"use client"
import React, { useMemo } from 'react'
import ProfileHeader from './ProfileHeader'
import Navbar from '../navbar/Navbar'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import ProfileInfo from './ProfileInfo'
import ProfileCartInfo from './ProfileCartInfo'
import ProfileButtons from './ProfileButtons'
import { Product } from '@/types/product'
import { useCart } from '@/context/CartContext'
import { DisplayCartItem } from '@/types/cart'

interface ProfilePageProps {
  products: Product[],
}

const ProfilePage = ({products}: ProfilePageProps) => {
  const router = useRouter();
  const {user, logout, isLoading } = useAuth();
  const { cart } = useCart();
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

   function handleLogout() {
    logout();
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  if(user) {
    const name = user.name;

    const initials = name.trim().split(" ").map(part => part[0].toUpperCase()).join("");

    const createdAt = user.createdAt;

    const since = createdAt.split("").toSpliced(0, 3);
    return (
      <div className='flex justify-evenely flex-col items-center gap-5 min-h-screen'>

        <Navbar />
        
        <div className='text-xl font-bold'>My Profile</div>

        <div className='flex flex-col justify-center items-center gap-6 w-full'>

        <ProfileHeader user={user} initials={initials} />

        <ProfileInfo since={since} />

        <ProfileCartInfo items={displayCartItem} />

        <ProfileButtons isLoading={isLoading} handleLogout={handleLogout} />

        </div>
      </div>
    )
  }
  {
      return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <div className='flex-1 flex justify-center items-center'>
        You must login to view profile...!
      </div>
    </div>
  )
  }
  
}

export default ProfilePage