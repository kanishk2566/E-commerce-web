export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export type AuthUser = Omit<User, "password">;