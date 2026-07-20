/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthUser, LoginData, RegisterData, User } from "@/types/user";

const API_URL = "http://localhost:3001"

export async function loginUser(data: LoginData): Promise<AuthUser> {

  const response = await fetch(`${API_URL}/users?email=${data.email}&password=${data.password}`);

  const users: User[] = await response.json();

  if(users.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = users[0];  
  const {password: _password, ...authUser} = user;

  return authUser;
  
}

export function registerUser(data: RegisterData) {

}