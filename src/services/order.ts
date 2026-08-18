import { CreateOrderData, Order } from "@/types/order";
import { apiFetch } from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export async function confirmOrder(
  orderData: CreateOrderData
): Promise<Order> {
  const subtotal = orderData.items.reduce(
    (total, item) => {
      return total + item.product.price * item.quantity;
    },
    0
  );

  const deliveryFees = orderData.deliveryMethod === "express" ? 99 : 0;

  const total = Math.max(0, subtotal + deliveryFees - orderData.discount);

  const order = {
    ...orderData,
    subtotal,
    deliveryFees,
    total,
    status: "placed" as const,
    createdAt: new Date().toISOString(),
  };

  const createdOrder = await apiFetch<Order>(
    `${API_BASE_URL}`,
    "/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );

  return createdOrder;
}