/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthUser, ChangePasswordData, EditData, LoginData, RegisterData, User } from "@/types/user";
import { apiFetch } from "./api";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export async function getUser(userId: string) {
  const user = await apiFetch<User>(`${API_BASE_URL}`, `/users/${userId}`);

  return user;
};

export async function loginUser(data: LoginData): Promise<AuthUser> {

  const users: User[] = await apiFetch(`${API_BASE_URL}`, `/users?email=${data.email}&password=${data.password}`);

  if(users.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = users[0];
  const {password: _password, ...authUser} = user;

  return authUser;
  
}

export async function registerUser(data: RegisterData) {

  const response = await fetch(`${API_BASE_URL}/users`);

  const users: User[] = await response.json();

  const existingEmail = users.find((user) => user.email === data.email);
  
  if(existingEmail) {
    toast.error("Email already exists");
    throw new Error("Email already exists");
  }
  
  const newUser = {
    ...data, role: "USER", createdAt: new Date().toDateString(), cart: [],
  }

  const data2 = await apiFetch<User>(`${API_BASE_URL}`, "/users", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(newUser),
  })

  const {password: _password, ...authUser} = data2;

  return authUser;

}

export async function EditUserProfile(userId: string, userData: EditData) {

  const response = await apiFetch<User>(`${API_BASE_URL}`, `/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(userData),
  });
  
  return response;
}

export async function ChangeUserPassword(userId: string, userData: ChangePasswordData) {
  const password = userData.password;

  const response = await apiFetch<User>(`${API_BASE_URL}`, `/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      password: password
    }),
  });
  
  return response;
}