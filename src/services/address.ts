import { User } from "@/types/user";
import { apiFetch } from "./api";
import { toast } from "react-toastify";
import { Address } from "@/types/address";

const API_BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export async function getAddress(userId: string): Promise<Address[]> {

  const user = await apiFetch<User>(`${API_BASE_URL}`, `/users/${userId}`);

  return user.address;
}

async function addAddress(userId: string,updatedAddress: Address[]) {
  const request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: updatedAddress,
    }),
  };

  await apiFetch(`${API_BASE_URL}`, `/users/${userId}`, request);
}

export async function saveAddress(userId: string, addressData: Address): Promise<Address[]> {
  const address = await getAddress(userId);

  const updatedAddress = [
    ...address,
    addressData,
  ];

  await addAddress(userId, updatedAddress);

  toast.success("Address saved..!!");
  console.log(updatedAddress);

  return updatedAddress;
}

