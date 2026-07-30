"use client";

import { createContext, useReducer, ReactNode, useContext, useState, useEffect } from "react";
import { PersistedCartItem } from "@/types/cart";
import { useAuth } from "./AuthContext";
import { addToCart as addToCartService, removeFromCart as removeFromCartService, decreaseQuantity as decreaseQuantityService, clearCart as clearCartService, getCart } from "@/services/cart";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState: PersistedCartItem[] = [];

interface CartContextType {
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  decreaseQuantity: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cart: PersistedCartItem[];
  isLoading: boolean;
  totalItem: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartAction {
  type: "SET_CART";
  payload: PersistedCartItem[];
}

const SET_CART = "SET_CART" as const;

function cartReducer(state: PersistedCartItem[], action: CartAction): PersistedCartItem[] {
  if(action.type === SET_CART) {
    return action.payload;
  }
    return state;
}

export function CartProvider({children}: CartProviderProps) {

  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  
  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    async function loadCart() {
      try {
        if(!user) {
        dispatch({
          type: SET_CART,
          payload: initialState,
        });
        return;
      }
      setIsLoading(true);
      const updatedCart = await getCart(user.id);
      dispatch({
        type: SET_CART,
        payload: updatedCart,
      });
      }
      catch(error) {
       toast.error(error instanceof Error ? error.message : "Something went wrong");
      }
      finally {
        setIsLoading(false);
      }
    }

    loadCart();
  }, [user]);

  async function syncCart(operation: () => Promise<PersistedCartItem[]>) {
    try {
      setIsLoading(true);
      const updatedCart = await operation();
      dispatch({
        type: SET_CART,
        payload: updatedCart,
      });
    }
    catch(error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong...!");
    }
    finally {
      setIsLoading(false);
    }
  }
  
  async function addToCart(productId: number) {
    if(!user) {
        toast(() => {
          return(
          <div className="flex flex-col justify-center items-center">
            You must be logged in to add item to cart..!!
            <button onClick={() => router.push("/login")} className="bg-blue-500 w-full py-1 text-white cursor-pointer rounded hover:bg-blue-600 transition-all">Login</button>
          </div>
          )
        });
        return;
      }
    await syncCart(() => addToCartService(user.id, productId))
  }

  async function removeFromCart(productId: number) {
    if(!user) {
      return;
    }
    await syncCart(() => removeFromCartService(user.id, productId));
  }

  async function decreaseQuantity(productId: number) {
   if(!user) {
      return;
    }
    await syncCart(() => decreaseQuantityService(user.id, productId));
  }

  async function clearCart() {
    if(!user) {
      return;
    }
    await syncCart(() => clearCartService(user.id));
  }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, decreaseQuantity, clearCart, isLoading, totalItem}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);

  if(!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}


