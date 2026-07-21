export type User = {
  id: number | string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export type AuthUser = Omit<User, "password"> | null;

export type RegisterData = Pick<User, "name" | "password" | "email">;

export type LoginData = Pick<User, "email" | "password">;
