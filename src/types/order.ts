
import { AddressType } from "./address";
import { DisplayCartItem } from "./cart";
import { paymentMethod } from "./payment";

export interface Order {
  id: Date,
  userId: string,
  items: DisplayCartItem[],
  address: AddressType,
  deliveryMethod: "express" | "normal",
  paymentStatus: "pending" | "paid" | "failed",
  paymentMethod: paymentMethod
  subtotal: number,
  deliveryFees: number,
  discount: number,
  total: number,
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled",
  createdAt: string,
}

export type CreateOrderData = Omit<Order, "id" | "createdAt" | "status">;

export type DeliveryMethod = "express" | "normal";


