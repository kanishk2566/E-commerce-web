"use client"
import { CardPayment, UPIPayment } from "@/types/payment"

export type CardDetailsErrors = Record<keyof CardPayment, string>;

type CardDetailsValidatorResult = {
  isValid: boolean,
  errors: CardDetailsErrors
};

export const INITIAL_CARD_DETAILS_ERRORS: CardDetailsErrors = {
  cardNumber: "",
  expiry: "",
  CVV: "",
  name: "",
}

export function validateCardDetails(cardDetails: CardPayment): CardDetailsValidatorResult {
  const errors = {...INITIAL_CARD_DETAILS_ERRORS};
  const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const trimmedName = cardDetails.name.trim();
  const numberRegex = /^(?:\d[ -]*){13,19}$/;
  const CVVReges = /^\d{3,4}$/;

  if(!cardDetails.cardNumber) {
    errors.cardNumber = "Card number is required";
  } else if(!numberRegex.test(cardDetails.cardNumber)) {
    errors.cardNumber = "Enter valid card number";
  }

  if(!cardDetails.expiry) {
    errors.cardNumber = "Expiry date is required";
  } 
  else if(!expiryRegex.test(cardDetails.expiry)) {
    errors.expiry = "Enter valid expiry date";
  }

  if(!cardDetails.CVV) {
    errors.CVV = "CVV is required";
  } else if(!CVVReges.test(cardDetails.CVV)) {
    errors.CVV = "Enter valid CVV";
  }
  if(!trimmedName) {
    errors.name = "Name is required";
  }
  
  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  }
}

export type UPIDetalsErrors = Record<keyof UPIPayment, string>;

type UPIDetailsValidatorResult = {
  isValid: boolean,
  errors: UPIDetalsErrors,
}

const INITIAL_UPI_DETAILS_ERRORS: UPIDetalsErrors = {
  UPIID: "",
}

export function validateUPIDetails(UPIDetails: UPIPayment): UPIDetailsValidatorResult {

  const UPIIDRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  const errors = {...INITIAL_UPI_DETAILS_ERRORS};
  const trimmedId = UPIDetails.UPIID.trim();


  if(!trimmedId) {
    errors.UPIID = "Please enter UPI Id";
  } else if (!UPIIDRegex.test(trimmedId)){
    errors.UPIID = "Enter valid UPI Id";
  }

  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  }
}
