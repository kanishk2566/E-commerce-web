import OrderSummary from '@/components/address/orderSummary/OrderSummery'
import { getAllProducts } from '@/services/products'
import React from 'react'

const page = async () => {
  const products = await getAllProducts();

  return (
    <OrderSummary products={products} />
  )
}

export default page