export type paymentMethod = "upi" | "card" | "cod" | null;

export type CardPayment = {
  cardNumber: string,
  expiry: string,
  CVV: string,
  name: string,
}

export type UPIPayment = {
  UPIID: string,
}