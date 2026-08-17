"use client"
import React, { useMemo, useState } from 'react'
import AddressPage from './address/AddressPage'
import { useCart } from '@/context/CartContext';
import { DisplayCartItem } from '@/types/cart';
import { Product } from '@/types/product';
import Navbar from '../navbar/Navbar';
import { Coupon } from '@/types/coupon';
import ProductSummary from './productSummary/ProductSummary';
import PaymentMethodCard from './paymentMethod/PaymentMethodCard';
import OrderSummeryPage from './OrderSummery/OrderSummeryPage';
import { paymentMethod } from '@/types/payment';
import { useAuth } from '@/context/AuthContext';
import { DeliveryMethod } from '@/types/order';

interface CheckoutPageProps {
  products: Product[];
  coupons: Coupon[];
}

const CheckoutPage = ({products, coupons}: CheckoutPageProps) => {
  const [discount, setDiscount] = useState(0);
  const [charges, setCharges] = useState(0);
  const [addressId, setAddressId] = useState("");
  const [paymentMethod, setPaymentmethod] = useState<paymentMethod>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("normal");
  const { user } = useAuth();
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

  const subtotal = displayCartItem.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const total = subtotal + charges - discount;

  const address = user?.address.filter((item) => item.id === addressId);
  if(address === undefined) return;

  return (
    <div>
      <Navbar />
      <div className='mt-15 lg:px-10 px-2 flex flex-col gap-5 mb-20'>

        <AddressPage setAddress={setAddressId} address={addressId} />

        <ProductSummary products={displayCartItem} coupons={coupons} discount={discount} setDiscount={setDiscount} charges={charges} setCharges={setCharges} totalPrice={subtotal} finalPrice={total} selectedMethod={deliveryMethod} setSelectedMethod={setDeliveryMethod}/>

        <PaymentMethodCard paymentMethod={paymentMethod} setPaymentMethod={setPaymentmethod} />

        <div>
          <OrderSummeryPage products={displayCartItem} discount={discount} charges={charges} address={address[0]} deliveryMethod={deliveryMethod} />
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage