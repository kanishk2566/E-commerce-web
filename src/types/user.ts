import { PersistedCartItem } from "./cart";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  cart: PersistedCartItem[];
}

export type AuthUser = Omit<User, "password"> | null;

export type RegisterData = Pick<User, "name" | "password" | "email">;

export type LoginData = Pick<User, "email" | "password">;

export type EditData = Pick<User, "name" | "email">;