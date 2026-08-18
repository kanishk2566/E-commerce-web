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
import { useAuth } from '@/context/AuthContext';
import { DeliveryMethod } from '@/types/order';
import { paymentMethod } from '@/types/payment';
import { AddressType } from '@/types/address';
import OrderSummeryPage from './OrderSummery/OrderSummeryPage';
import { confirmOrder } from '@/services/order';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
  const [paymentVerified ,setPaymentVerified] = useState(false);
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  
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

  const addresses: AddressType[] | undefined = user?.address.filter((item) => item.id === addressId);

  if(addresses === undefined) return;
  const address = addresses[0];
  const deliveryFees = charges;

  async function handleConfirmOrder() {
  if (!user) {
    toast.error("Please login first");
    return;
  }

  if (!addressId) {
    toast.error("Please select a delivery address");
    return;
  }

  if (!paymentMethod) {
    toast.error("Please select a payment method");
    return;
  }

  try {
    const paymentStatus =
      paymentMethod === "cod"
        ? "pending"
        : "paid";

    const order = await confirmOrder({
      userId: user.id,
      items: displayCartItem,
      address: address,
      deliveryMethod,
      paymentMethod,
      paymentStatus,
      discount,
      deliveryFees,
      subtotal,
      total,
    });

    clearCart();

    toast.success("Order placed successfully!");

    router.push(`/order-confirmation/${order.id}`);
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to place order"
    );
  }
}

  return (
    <div>
      <Navbar />
      <div className='mt-15 lg:px-10 px-2 flex flex-col gap-5 mb-20'>
       <AddressPage setAddress={setAddressId} address={addressId} />
        
        <ProductSummary products={displayCartItem} coupons={coupons} discount={discount} setDiscount={setDiscount} charges={charges} setCharges={setCharges} selectedMethod={deliveryMethod} setSelectedMethod={setDeliveryMethod} totalPrice={subtotal} finalPrice={total} />
        
        <PaymentMethodCard setPaymentMethod={setPaymentmethod} paymentMethod={paymentMethod} setPaymentVerified={setPaymentVerified} paymentVerified={paymentVerified} />
        <OrderSummeryPage products={displayCartItem} discount={discount} charges={charges} address={address} deliveryMethod={deliveryMethod} paymentMethod={paymentMethod} paymentVerified={paymentVerified} handleConfirmOrder={handleConfirmOrder} />
      </div>
    </div>
  )
}

export default CheckoutPage

