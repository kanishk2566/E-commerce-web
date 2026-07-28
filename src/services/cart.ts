import CartItem from "@/components/cart/CartItem";
import { CartItemType } from "@/types/cart";
import { User } from "@/types/user";

const API_URL = "http://localhost:3008/users";

export async function addToCart(userId: string, cartItem: CartItemType) {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    const user: User = await response.json();

    const existingItem = user.cart.find((item) => item.product.id === cartItem.product.id);

    if(existingItem) {
      existingItem.quantity++;
    }

    const newItem = {...cartItem, id: JSON.stringify(new Date())};
    console.log("New item", newItem);

    const response2 = await fetch(`${API_URL}/${CartItem}`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const data = await response2.json();
    console.log("data", data);

    return data;
  }
  catch(error) {
    if(error instanceof Error) {
      return error.message;
    }
  }
}

