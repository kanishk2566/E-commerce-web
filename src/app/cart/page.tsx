import CartPage from '@/components/cart/CartPage'
import { getAllProducts } from '@/services/products'
import React from 'react'

const Page = async () => {
  const products = await getAllProducts();
    return (
      <CartPage products={products} />
    )
  }

export default Page