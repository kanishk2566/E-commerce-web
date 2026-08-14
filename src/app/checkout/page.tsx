import CheckoutPage from '@/components/checkout/CheckoutPage'
import { getCoupons } from '@/services/checkout';
import { getAllProducts } from '@/services/products'
import React from 'react'

const page = async () => {
  const products = await getAllProducts();
  const coupons = await getCoupons();
  return (
    <CheckoutPage products={products} coupons={coupons} />
  )
}

export default page