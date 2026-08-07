"use client"
import React, { useMemo, useState } from 'react'
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
import EditProfile from '../auth/EditProfile'
import ChangePassword from '../auth/ChangePasswordPage'
import { motion } from 'motion/react'

interface ProfilePageProps {
  products: Product[],
}

const ProfilePage = ({products}: ProfilePageProps) => {
  const router = useRouter();
  const {user, logout, isLoading } = useAuth();
  const { cart } = useCart();
  const [edit, setEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

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
      <div
      className='flex justify-evenely flex-col items-center min-h-screen w-full'>

        <Navbar />
        
        <div className='mt-20 lg:mt-20 mb-20 flex flex-col justify-center items-center gap-5 w-full px-8'>
          

        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='grid grid-cols-2 gap-3 lg:w-7/12 bg-[#D2DCE6] xl:w-1/2 p-5 border rounded shadow-[0_0_20px_3px_rgba(0,0,0,0.2)]'>
        <div className='text-xl font-bold border-l-5 px-3 flex justify-start col-span-2 items-start w-full'>My Profile</div>

        <ProfileHeader user={user} initials={initials} />

        <ProfileInfo since={since} />

        <ProfileCartInfo items={displayCartItem} />

        <ProfileButtons isLoading={isLoading} handleLogout={handleLogout} toggleEditPage={() => setEdit(true)} toggleChangePassword={() => setChangePassword(true)} />
        
        {edit && <EditProfile toggleEditPage={() => setEdit(false)} />}
        
        {changePassword && <ChangePassword toggleChangePassword={() => setChangePassword(false)} />}

        </motion.div>
        </div>
      </div>
    )
  }
  {
    return (
      <div className='flex flex-col justify-between h-screen overflow-hidden'>
        <Navbar />
        <div className='flex-1 flex justify-center items-center mt-20 mb-20'>
          You must login to view profile...!
        </div>
      </div>
    )
  }
  
}

export default ProfilePage