"use client"
import CartPage from '@/components/cart/CartPage'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!isAuthenticated) {
      router.push("/login");
    }
  })

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      {isAuthenticated && (
        <CartPage />
      )}
    </div>
  )
}

export default Page