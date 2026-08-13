import CheckoutPage from '@/components/checkout/CheckoutPage'
import { getAllProducts } from '@/services/products'
import React from 'react'

const page = async () => {
  const products = await getAllProducts();
  return (
    <CheckoutPage products={products} />
  )
}

export default page