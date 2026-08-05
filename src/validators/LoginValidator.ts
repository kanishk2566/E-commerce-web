import { LoginData } from "@/types/user";

export type LoginFormErrors = Record<keyof LoginData, string>;

type LoginValidatorResult = {
  isValid: boolean,
  errors: LoginFormErrors,
}

export const INITIAL_LOGIN_FORM_ERRORS: LoginFormErrors = {
  email: "",
  password: ""
}

export function validateLoginForm(formData: LoginData): LoginValidatorResult {
  const trimmedEmail = formData.email.trim();
  const trimmedPassword = formData.password.trim();
  const errors = {...INITIAL_LOGIN_FORM_ERRORS};

  if(!trimmedEmail) {
    errors.email = "Email cannot be empty";
  } 

  if(!trimmedPassword) {
    errors.password = "Password cannot be empty";
  }

  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  }
}