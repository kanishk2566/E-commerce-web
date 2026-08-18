export interface AddressType {
  id: string,
  name: string,
  phone: string,
  addressLine: string,
  city: string,
  state: string,
  pincode: string,
  title: string,
}

export type AddressFormData = Omit<AddressType, "id">;
