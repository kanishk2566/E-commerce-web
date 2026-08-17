"use client"

import { AddressFormData } from "@/types/address";

export type AddressFormErrors = Record<keyof AddressFormData, string>;

type AddressValidatorResult = {
  isValid: boolean,
  errors: AddressFormErrors
};

export const INITIAL_ADDRESS_FORM_ERRORS: AddressFormErrors = {
  name: "",
  addressLine: "",
  phone: "",
  pincode: "",
  city: "",
  state: "",
  title: "",
}

export function validateAddressForm(formData: AddressFormData): AddressValidatorResult {

  const errors = { ...INITIAL_ADDRESS_FORM_ERRORS };

  const labels: Record<keyof AddressFormData, string> = {
    name: "Name",
    phone: "Phone number",
    addressLine: "Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
    title: "",
  };

  (Object.keys(formData) as (keyof AddressFormData)[]).forEach(
    (field) => {
      if (!formData[field].trim()) {
        errors[field] = `${labels[field]} is required`;
      }
    }
  );

  if (formData.phone && !/^\d+$/.test(formData.phone)) {
  errors.phone = "Phone number must contain numbers only";
  } else if(formData.phone.length < 10) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
    errors.pincode = "Pincode must be 6 digits";
  }

  return {
    isValid: Object.values(errors).every(
      (error) => error === ""
    ),
    errors,
  };
}