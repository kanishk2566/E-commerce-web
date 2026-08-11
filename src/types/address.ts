export interface Address {
  name: string,
  phone: string,
  addressLine: string,
  city: string,
  state: string,
  pincode: string,
}

export type AddressFormData = Address;