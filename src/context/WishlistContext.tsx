"use client"

import { Wishlist } from "@/types/wishlist"
import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { getWishlist, addToWishlist as addToWishlistService, removeFromWishlist as removeFromWishlistService } from "@/services/wishlist";
import { toast } from "react-toastify";
import { Product } from "@/types/product";

const initialState: Wishlist[] = [];

interface WishlistContextType {
  addToWishlist: (product: Product ) => Promise<void>;
  removeFromWishlist: (Product: Product) => Promise<void>;
  wishlist: Wishlist[];
  isLoading: boolean;
}

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

interface WishlistAction {
  type: "SET_WISHLIST",
  payload: Wishlist[];
}

const SET_WISHLIST = "SET_WISHLIST" as const;

function wishlistReducer(state: Wishlist[], action: WishlistAction): Wishlist[] {
  if(action.type === SET_WISHLIST) {
    return action.payload;
  }
  return state;
}

export function WishlistProvider({children}: WishlistProviderProps) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { user }= useAuth();
  const router = useRouter();
  
  useEffect(() => {
    async function loadWishlist() {
      try {
        if(!user) {
          dispatch({
            type: SET_WISHLIST,
            payload: initialState,
          });
          return;
        }
        setIsLoading(true);
        const updatedWishlist = await getWishlist(user.id);
        dispatch({
          type: SET_WISHLIST,
          payload: updatedWishlist,
        });
      }
      catch(error){
        toast.error(error instanceof Error ? error.message : "Something went wrong");
      }
      finally {
        setIsLoading(false);
      }
    }

    loadWishlist();
  }, [user]);

  async function syncWishlist(operation: () => Promise<Wishlist[]>) {
    try {
      setIsLoading(true);
      const updatedWishlist = await operation();
      dispatch({
        type: SET_WISHLIST,
        payload: updatedWishlist,
      });
    }
    catch(error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
    finally {
      setIsLoading(false);
    }
  }

  async function addToWishlist(product: Product) {
    if(!user) {
      toast(() => {
          return (
          <div className="flex flex-col justify-center items-center">
            You must be logged in to create wishlist..!!
            <button onClick={() => router.push("/login")} className="bg-[#401b1b] w-full py-1 text-white cursor-pointer rounded hover:bg-[#72383d] transition-all">Login</button>
          </div>
          )
        })
      return;
    }
    
    await syncWishlist(() => addToWishlistService(user.id, product));
  }

  async function removeFromWishlist(product: Product) {
    if(!user) {
      return;
    }

    await syncWishlist(() => removeFromWishlistService(user.id, product.id));
  }

  return (
    <WishlistContext.Provider value={{wishlist, addToWishlist, removeFromWishlist, isLoading}}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if(!context) {
    throw new Error("useWishlist must be inside wishlistProvider");
  }
}