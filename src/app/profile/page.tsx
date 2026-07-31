import ProfilePage from '@/components/profile/ProfilePage'
import { getAllProducts } from '@/services/products'
import React from 'react'

const page = async () => {
  const products = await getAllProducts();
  return (
    <div>
      <ProfilePage products={products} />
    </div>
  )
}

export default page