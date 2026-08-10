import { Wishlist } from "@/types/wishlist";
import { apiFetch } from "./api";
import { User } from "@/types/user";
import { Product } from "@/types/product";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export async function getWishlist(userId: string): Promise<Wishlist[]> {
  const user = await apiFetch<User>(`${API_BASE_URL}`, `/users/${userId}`);

  const wishlist = user.wishlist;

  return wishlist;
}

async function saveWishlist(userId: string, updatedWishlist: Wishlist[]) {
  const Request = {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      wishlist: updatedWishlist,
    }),
  }

  await apiFetch(`${API_BASE_URL}`, `/users/${userId}`, Request);
}

export async function removeFromWishlist(userId: string, productId: number): Promise<Wishlist[]> {
  const wishlist = await getWishlist(userId);

  const updatedWishlist = wishlist.filter((item) => item.product.id !== productId);

  await saveWishlist(userId, updatedWishlist);
  toast.success("Item removed from wishlist...!!");

  return updatedWishlist;
} 

export async function addToWishlist(userId: string, product: Product): Promise<Wishlist[]> {
  const wishlist = await getWishlist(userId);

  const existingItem = wishlist.find((item) => item.product.id === product.id);

  let updatedWishlist: Wishlist[];

  if(existingItem) {
    updatedWishlist = await removeFromWishlist(userId, product.id);
    return updatedWishlist;
  }

  updatedWishlist = [ ...wishlist, {product: product}];

  await saveWishlist(userId, updatedWishlist);
  toast.success("Item added to wishlist...!!");

  return updatedWishlist;

}