import { PersistedCartItem } from "./cart";
import { Wishlist } from "./wishlist";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  cart: PersistedCartItem[];
  wishlist: Wishlist[];
}

export type AuthUser = Omit<User, "password"> | null;

export type RegisterData = Pick<User, "name" | "password" | "email">;

export type LoginData = Pick<User, "email" | "password">;

export type EditData = Pick<User, "name" | "email">;

export type ChangePasswordData = Pick<User, "password"> & {
  previousPassword: string,
  confirmPassword: string,
};