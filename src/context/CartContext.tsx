/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useReducer, ReactNode, useContext } from "react";
import { CartItem } from "@/types/cart";

const initialState: CartItem[] = [];

interface CartAction {
  type: string;
  payload?: any;
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {

  switch (action.type) {
    case "ADD_TO_CART":
      {const existingItem = state.find((item) => item.product.id === action.payload.id);
        if(!existingItem) {
          return [
            ...state,
            {
              product: action.payload,
              quantity: 1
            },
          ];
        }

        return state.map((item) => {
          if (existingItem.product.id === action.payload.id) {
            return {
              ...item,
                quantity: item.quantity + 1
            };
          }

          return item;
        });
      }
      
    case "REMOVE_FROM_CART":
      {return state.filter((item) => action.payload === item.product.id)}
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({children}: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{cart, dispatch}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);

  if(!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
}

interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>
}

export const CartContext = createContext<CartContextType | null>(null);