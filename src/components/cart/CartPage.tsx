"use client"
import React, { useEffect, useMemo, useState } from 'react'
import CartCard from './CartCard'
import Navbar from '../navbar/Navbar';
import { Product } from '@/types/product';
import { getAllProducts } from '@/services/products';
import { toast } from 'react-toastify';
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';

const CartPage = () => {
  const [products, setProducts] = useState<Product[]>();
  const { cart, isLoading } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      }
      catch(error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong");
      }
    }

    loadProducts();
  }, []);

  const displayCartItem: DisplayCartItem[] = useMemo(() => {
    return cart.flatMap((cartItem) => {
      const product = products?.find((product) => product.id === cartItem.productId);

      if(!product) {
        return [];
      }

      return [{
        product,
        quantity: cartItem.quantity,
      }];
    });
  }, [cart, products]);

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center overflow-x-hidden'>
      <Navbar inCart={true} inHome={false} inRegister={false} inLogin={false} inProfile={false}/>
      <div className='flex pt-5'>

        <CartCard items={displayCartItem} isLoading={isLoading} />
      
      </div>
      
    </div>
  )
}

export default CartPage