import { PersistedCartItem } from "@/types/cart";

const API_URL = "http://localhost:3008/users";

export async function getCart(userId: string): Promise<PersistedCartItem[]> {
  const response = await fetch(`${API_URL}/${userId}`);
  const user = await response.json();

  const cart = user.cart;

  return cart;
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
    throw new Error("Falied to update cart");
  }

  return updatedCart;
}