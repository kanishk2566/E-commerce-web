"use client"
import CartPage from '@/components/cart/CartPage'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!isAuthenticated && !isLoading) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if(isAuthenticated) {
    return (
      <CartPage />
    )
  }
}

export default Page