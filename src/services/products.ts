import { Product } from "@/types/product";
import { apiFetch } from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_BASE_URL;

export async function getAllProducts(): Promise<Product[]> {
  const response = await apiFetch<Product[]>(`${API_BASE_URL}`, `/products`);

  return response;
}

export async function getProduct(id: number): Promise<Product> {
  const response = await apiFetch<Product>(`${API_BASE_URL}`, `/products/${id}`);

  return response;
}

