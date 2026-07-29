import { PersistedCartItem } from "@/types/cart";

const API_URL = "http://localhost:3008/users";

export async function getCart(userId: string): Promise<PersistedCartItem[]> {
  const response = await fetch(`${API_URL}/${userId}`);
  const user = await response.json();

  const cart = user.cart;

  return cart;
}

async function saveCart( userId: string, updatedCart: PersistedCartItem[]) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      cart: updatedCart,
    }),
  });

  if(!response.ok) {
    throw new Error("Failed to update cart...try again.!");
  };
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
  console.log("Added", productId);
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