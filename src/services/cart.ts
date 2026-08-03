import { PersistedCartItem } from "@/types/cart";
import { apiFetch } from "./api";
import { User } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export async function getCart(userId: string): Promise<PersistedCartItem[]> {

  const user= await apiFetch<User>(`${API_BASE_URL}`, `/users/${userId}`);

  const cart = user.cart;

  return cart;
}

async function saveCart( userId: string, updatedCart: PersistedCartItem[]) {

  const Request = {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      cart: updatedCart,
    }),
  }

  await apiFetch(`${API_BASE_URL}`, `/users/${userId}`, Request )
}

export async function addToCart(userId: string, productId: number): Promise<PersistedCartItem[]> {
  const cart = await getCart(userId);

  const existingCartItem = cart.find((item) => item.productId === productId);

  let updatedCart: PersistedCartItem[];

  if(existingCartItem) {
    updatedCart = cart.map((item) => {
      if(item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
  } else {
    updatedCart = [
      ...cart,
      {
        productId,
        quantity: 1,
      },
    ];
  }

  await saveCart(userId, updatedCart);
    return updatedCart;
}

export async function removeFromCart(userId: string, productId: number): Promise<PersistedCartItem[]> {
  const cart = await getCart(userId);

  const updatedCart = cart.filter((item) => item.productId !== productId);
  
  await saveCart(userId, updatedCart);

  return updatedCart;
}

export async function decreaseQuantity(userId: string, productId: number): Promise<PersistedCartItem[]> {
  const cart = await getCart(userId);
  
  const existingCartItem = cart.find((item) => item.productId === productId);

  let updatedCart: PersistedCartItem[];

  if(!existingCartItem) {
    return cart;
  }

  if(existingCartItem.quantity <= 1 ) {
    updatedCart = cart.filter((item) => item.productId !== productId);
  } else {
    updatedCart = cart.map((item) => {
      if(item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      }
      return item;
    });
  }

  await saveCart(userId, updatedCart);

  return updatedCart;
}

export async function clearCart(userId: string): Promise<PersistedCartItem[]> {

  const updatedCart: PersistedCartItem[] = [];

  await saveCart(userId, updatedCart);

  return updatedCart;
}