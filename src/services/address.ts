import { User } from "@/types/user";
import { apiFetch } from "./api";
import { toast } from "react-toastify";
import { Address, AddressFormData } from "@/types/address";

const API_BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export async function getAddress(userId: string): Promise<Address[]> {

  const user = await apiFetch<User>(`${API_BASE_URL}`, `/users/${userId}`);

  return user.address;
}

async function addAddress(userId: string, updatedAddress: Address[]) {
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

export async function saveAddress(userId: string, addressData: AddressFormData): Promise<Address[]> {
  const address = await getAddress(userId);

  const newAddress = {
    ...addressData,
    id: crypto.randomUUID(),
  }

  const updatedAddress = [
    ...address,
    newAddress,
  ];

  await addAddress(userId, updatedAddress);

  toast.success("Address saved..!!");
  console.log(updatedAddress);

  return updatedAddress;
}

export async function deleteAddress(userId: string, addressId: string): Promise<Address[]> {
  const address = await getAddress(userId);

  const updatedAddress = address.filter((item) => item.id !== addressId);

  await addAddress(userId, updatedAddress);

  toast.success("Address deleted...!");

  return updatedAddress;
}

