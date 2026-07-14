import { Product } from "@/types/product";

const API = "https://fakestoreapi.com/products"

export async function getAllProducts(): Promise<Product> {
  const response = await fetch(API);

  if(!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
