import { Address } from "cluster";
import { DisplayCartItem } from "./cart";

export interface Order {
  id: Date,
  userId: string,
  items: DisplayCartItem[],
  address: Address,
  deliveryMethod: "express" | "normal",
  paymentStatus: "pending" | "paid" | "failed",
  subtotal: number,
  deliveryFees: number,
  discount: number,
  total: number,
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled",
  createdAt: string,
}

export type DeliveryMethod = "express" | "normal";


