import { Product } from "./product";

export interface DisplayCartItem {
  product: Product;
  quantity: number;
}

export type PersistedCartItem = {
  productId: number;
  quantity: number;
}