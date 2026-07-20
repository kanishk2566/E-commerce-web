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

export async function registerUser(data: RegisterData) {

  const response = await fetch(`${API_URL}/users`);

  const users: User[] = await response.json();

  const existingEmail = users.find((user) => user.email === data.email);
  
  if(existingEmail) {
    throw new Error("Email already exists");
  }
  
  const newUser = {
    ...data, role: "USER", createdAt: new Date().toISOString()
  }

  const response2 = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
  });

  const data2: User = await response2.json();

  const {password: _password, ...authUser} = data2;

  return authUser;
}